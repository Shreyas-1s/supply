from flask import Flask, request, jsonify
from neo4j import GraphDatabase  # type: ignore
from flask_cors import CORS

import uuid



app = Flask(__name__, static_folder='static', template_folder='templates')
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

# Neo4j Connection
uri = "bolt://localhost:7687"
username = "neo4j"
password = "12345678"
driver = GraphDatabase.driver(uri, auth=(username, password))

def get_db():
    # return driver.session()
    return driver

# Helper Functions
def execute_query(query, parameters=None, write=False):
    try:
        with driver.session() as session:
            if write:
                result = session.write_transaction(lambda tx: tx.run(query, **(parameters or {})))
            else:
                result = session.read_transaction(lambda tx: tx.run(query, **(parameters or {})))
            return result
    except Exception as e:
        print(f"Error executing query: {e}")
        return None

def create_node(label, properties):
    query = f"MERGE (n:{label} {{ {', '.join([f'{k}: ${k}' for k in properties])} }}) RETURN n"
    execute_query(query, properties, write=True)

@app.teardown_appcontext
def close_driver(exception):
    driver.close()
def find_all_nodes(label):
    with driver.session() as session:
        result = session.run(f"MATCH (n:{label}) RETURN n")
        nodes = [record["n"] for record in result]
        return nodes


def delete_node(label, key, value):
    query = f"MATCH (n:{label} {{{key}: $value}}) DETACH DELETE n"
    result = execute_query(query, {'value': value}, write=True)
    return result.summary().counters.nodes_deleted > 0 if result else False

def create_user_and_relate_to_users(data):
    with driver.session() as session:
        try:
            # Start a transaction
            with session.begin_transaction() as tx:
                # Create or merge the User node
                tx.run(
                    """
                    MERGE (u:User {email: $email})
                    ON CREATE SET u.name = $name, u.password = $password
                    """,
                    name=data['name'],
                    email=data['email'],
                    password=data['password']
                )

                # Ensure the Users node exists
                tx.run(
                    """
                    MERGE (users:Users {id: $users_id})
                    """,
                    users_id=3
                )

                # Connect the User node to the existing Users node
                tx.run(
                    """
                    MATCH (u:User {email: $email})
                    MATCH (users:Users {id: $users_id})
                    MERGE (users)-[:CONTAINS]->(u)
                    """,
                    email=data['email'],
                    users_id=3
                )
            # Commit transaction
            tx.commit()
        except Exception as e:
            print(f"Error creating user and relating to Users node: {e}")
            raise e

# Routes
@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    try:
        create_user_and_relate_to_users(data)
        return jsonify({"message": "User created and linked to Users node successfully"}), 201
    except Exception as e:
        print(f"Error during signup: {e}")
        return jsonify({"message": "An error occurred during signup."}), 500


@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400

    try:
        # Connect to Neo4j and execute the query directly
        with driver.session() as session:
            # Query to find the user with the provided email
            result = session.run("MATCH (u:User {email: $email}) RETURN u.password AS password", email=email)

            # Check if the query returned any results
            record = result.single()
            if record:
                # Retrieve the stored password from the result
                user_password = record.get('password')

                # Check if the password matches
                if user_password == password:
                    return jsonify({"message": "Login successful"}), 200
                else:
                    return jsonify({"message": "Invalid credentials"}), 401
            else:
                return jsonify({"message": "User not found"}), 404

    except Exception as e:
        # Log and return a 500 error if something went wrong
        print(f"Error during login: {e}")
        return jsonify({"message": "An error occurred during login."}), 500

@app.route('/update_user/<string:email>', methods=['PUT'])
def update_user_route(email):
    data = request.json
    query = "MATCH (n:User {email: $email}) SET n.name = $name, n.password = $password"
    updated = execute_query(query, {**data, 'email': email}, write=True)
    if updated:
        return jsonify({"message": "User updated successfully"}), 200
    else:
        return jsonify({"message": "User not found"}), 404

@app.route('/delete_user/<string:email>', methods=['DELETE'])
def delete_user_route(email):
    deleted = delete_node('User', 'email', email)
    return jsonify({"message": "User deleted successfully" if deleted else "User not found"}), 200 if deleted else 404

@app.route('/add_supplier', methods=['POST'])
def add_supplier():
    data = request.json
    create_node('Supplier', data)
    return jsonify({"message": "Supplier added successfully"}), 201

@app.route('/suppliers', methods=['GET'])
def get_suppliers():
    suppliers = find_all_nodes('Supplier')
    suppliers_list = [{"name": s["name"], "email": s["email"], "company": s["company"]} for s in suppliers]
    return jsonify(suppliers_list), 200

@app.route('/delete_supplier/<string:name>', methods=['DELETE'])
def delete_supplier(name):
    deleted = delete_node('Supplier', 'name', name)
    return jsonify({"message": "Supplier deleted successfully!" if deleted else "Supplier not found"}), 200 if deleted else 404

@app.route('/add_tool', methods=['POST'])
def add_tool():
    data = request.json
    create_node('Tool', data)
    return jsonify({"message": "Tool added successfully"}), 201

@app.route('/tools', methods=['GET'])
def get_tools():
    tools = find_all_nodes('Tool')
    tools_list = [{"name": t["name"], "description": t["description"]} for t in tools]
    return jsonify(tools_list), 200

@app.route('/delete_tool/<string:name>', methods=['DELETE'])
def delete_tool(name):
    deleted = delete_node('Tool', 'name', name)
    return jsonify({"message": "Tool deleted successfully!" if deleted else "Tool not found"}), 200 if deleted else 404

@app.route('/add_part', methods=['POST'])
def add_part():
    data = request.json
    create_node('Part', data)
    return jsonify({"message": "Part added successfully"}), 201

@app.route('/parts', methods=['GET'])
def get_parts():
    parts = find_all_nodes('Part')
    parts_list = [{"name": p["name"], "description": p["description"]} for p in parts]
    return jsonify(parts_list), 200

@app.route('/delete_part/<string:name>', methods=['DELETE'])
def delete_part(name):
    deleted = delete_node('Part', 'name', name)
    return jsonify({"message": "Part deleted successfully!" if deleted else "Part not found"}), 200 if deleted else 404

@app.route('/order/<string:order_id>', methods=['GET'])
def get_order(order_id):
    query = "MATCH (o:Order {order_id: $order_id}) RETURN o"
    result = execute_query(query, {'order_id': order_id})
    order = result.single() if result else None
    return jsonify(order['o']) if order else jsonify({"error": "Order not found"}), 404 if not order else 200

# @app.route('/add_product', methods=['POST'])
# def add_product():
#     data = request.json
#     create_node('Product', data)
#     return jsonify({"message": "Product added successfully"}), 201

# @app.route('/products', methods=['GET'])
# def get_products():
#     products = find_all_nodes('Product')
#     products_list = [{"name": p["name"], "description": p["description"], "price": p["price"], "imageUrl": p["imageUrl"]} for p in products]
#     return jsonify(products_list), 200

# @app.route('/delete_product/<string:name>', methods=['DELETE'])
# def delete_product(name):
#     deleted = delete_node('Product', 'name', name)
#     return jsonify({"message": "Product deleted successfully!" if deleted else "Product not found"}), 200 if deleted else 404

# @app.route('/api/products', methods=['GET', 'POST'])
# def products():
#     db = get_db()
#     try:
#         with db.session() as session:  # Open the session correctly
#             result = session.run(
#                 """
#                 MATCH (main:Products)-[:CONTAINS]->(p:Product)
#                 RETURN p
#                 """
#             )
#             products = [{'id': record['p']['id'], 'name': record['p']['name'], 'sku': record['p']['sku'], 'price': record['p']['price']} for record in result]
#             return jsonify(products), 200
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500
#     finally:
#         db.close()  # Ensure the driver is closed properly

# @app.route('/api/products', methods=['POST'])
# def add_product():
#     db = get_db()
#     data = request.json

#     if 'name' not in data or 'sku' not in data or 'price' not in data:
#         return jsonify({'error': 'Missing fields'}), 400

#     try:
#         with db.session() as session:
#             result = session.run(
#                 """
#                 MATCH (main:Products)
#                 CREATE (p:Product {id: apoc.create.uuid(), name: $name, sku: $sku, price: $price})
#                 MERGE (main)-[:CONTAINS]->(p)
#                 RETURN p
#                 """,
#                 name=data['name'], sku=data['sku'], price=data['price']
#             )
#             new_product = result.single()['p']
#             return jsonify(dict(new_product)), 201
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500
#     finally:
#         db.close()

# @app.route('/api/products', methods=['GET', 'POST'])
# def products():
#     if request.method == 'GET':
#         return get_products()
#     elif request.method == 'POST':
#         return add_product()

# def get_products():
#     db = get_db()
#     try:
#         with db.session() as session:
#             result = session.run(
#                 """
#                 MATCH (main:Products)-[:CONTAINS]->(p:Product)
#                 RETURN p
#                 """
#             )
#             products = [dict(record['p']) for record in result]
#             return jsonify(products), 200
#     except Exception as e:
#         app.logger.error(f"Error fetching products: {str(e)}")
#         return jsonify({'error': 'Internal server error'}), 500

# def add_product():
#     db = get_db()
#     data = request.json
#     if not all(key in data for key in ['name', 'sku', 'price']):
#         return jsonify({'error': 'Missing required fields'}), 400
#     try:
#         with db.session() as session:
#             result = session.run(
#                 """
#                 MERGE (main:Products)
#                 CREATE (p:Product {id: apoc.create.uuid(), name: $name, sku: $sku, price: $price})
#                 MERGE (main)-[:CONTAINS]->(p)
#                 RETURN p
#                 """,
#                 name=data['name'], sku=data['sku'], price=float(data['price'])
#             )
#             new_product = dict(result.single()['p'])
#             return jsonify(new_product), 201
#     except Exception as e:
#         app.logger.error(f"Error adding product: {str(e)}")
#         return jsonify({'error': 'Internal server error'}), 500

# @app.route('/api/products', methods=['GET'])
# def get_products():
#     with driver.session() as session:
#         result = session.run("MATCH (p:Product) RETURN p")
#         products = [{"id": record["p"]["id"], "name": record["p"]["name"], "price": record["p"]["price"]} for record in result]
#         return jsonify(products)

# # Add a new product
# @app.route('/api/products', methods=['POST'])
# def add_product():
#     data = request.json
#     name = data.get("name")
#     price = data.get("price")
    
#     if not name or not price:
#         return jsonify({"error": "Invalid data"}), 400
    
#     with driver.session() as session:
#         session.run(
#             "CREATE (p:Product {id: apoc.create.uuid(), name: $name, price: $price})",
#             name=name, price=price
#         )
#     return jsonify({"message": "Product added successfully!"}), 201



# def create_central_orders_node(tx):
#     tx.run("MERGE (:Orders {name: 'Central Orders'})")

# @app.route('/api/orders', methods=['POST'])
# def add_order():
#     data = request.json
#     required_fields = ["order_id", "delivery_number", "shipping_address", "status", "price", "pieces"]
    
#     # Check for missing fields
#     if not all(field in data for field in required_fields):
#         return jsonify({"error": "Missing fields"}), 400
    
#     # Proceed with adding order to the database
#     with driver.session() as session:
#         session.write_transaction(create_order_node, data["order_id"], data["delivery_number"], 
#                                   data["shipping_address"], data["status"], data["price"], data["pieces"])
    
#     return jsonify({"message": "Order created successfully"}), 201


# def create_order_node(tx, order_id, delivery_number, shipping_address, status, price, pieces):
#     tx.run("""
#         MATCH (orders:Orders)
#         CREATE (order:Order {
#             order_id: $order_id, 
#             delivery_number: $delivery_number, 
#             shipping_address: $shipping_address,
#             status: $status,
#             price: $price,
#             pieces: $pieces
#         })-[:BELONGS_TO]->(orders)
#     """, order_id=order_id, delivery_number=delivery_number, shipping_address=shipping_address, status=status, price=price, pieces=pieces)




# @app.route('/api/library', methods=['POST'])
# def add_resource():
#     data = request.json
#     if 'title' not in data or 'description' not in data or 'link' not in data:
#         return jsonify({'error': 'Missing fields'}), 400

#     try:
#         with driver.session() as session:
#             session.run("MERGE (main:Resources)")
#             result = session.run(
#                 """
#                 MATCH (main:Resources)
#                 CREATE (r:Resource {id: randomUUID(), title: $title, description: $description, link: $link})
#                 MERGE (main)-[:CONTAINS]->(r)
#                 RETURN r
#                 """,
#                 title=data['title'], description=data['description'], link=data['link']
#             )
#             new_resource = result.single()['r']
#             return jsonify(dict(new_resource)), 201
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500
# @app.route('/api/resources', methods=['GET'])
# def get_resources():
#     try:
#         with driver.session() as session:
#             result = session.run("""
#                 MATCH (r:Resource)
#                 RETURN r
#             """)
#             resources = []
#             for record in result:
#                 res_node = record['r']
#                 resources.append({
#                     "id": res_node.identity,  # Use 'identity' for Neo4j internal ID
#                     "title": res_node["title"],
#                     "description": res_node["description"],
#                     "link": res_node["link"]
#                 })
#             return jsonify(resources), 200
#     except Exception as e:
#         print(f"Error fetching resources: {e}")
#         return jsonify({"error": "Failed to fetch resources"}), 500

# # Route to add a new resource
# @app.route('/api/resources', methods=['POST'])
# def add_resource():
#     data = request.json
#     title = data.get('title')
#     description = data.get('description')
#     link = data.get('link')

#     if not title or not description or not link:
#         return jsonify({"error": "All fields are required"}), 400

#     try:
#         with driver.session() as session:
#             result = session.run("""
#                 CREATE (r:Resource {title: $title, description: $description, link: $link})
#                 RETURN r
#             """, title=title, description=description, link=link)
#             record = result.single()
#             resource = record['r']
#             return jsonify({
#                 "id": resource.identity,  # Use 'identity' for Neo4j internal ID
#                 "title": resource["title"],
#                 "description": resource["description"],
#                 "link": resource["link"]
#             }), 201
#     except Exception as e:
#         print(f"Error adding resource: {e}")
#         return jsonify({"error": "Failed to add resource"}), 500

@app.route('/api/resources', methods=['GET'])
def get_resources():
    try:
        with driver.session() as session:
            result = session.run("MATCH (r:Resource) RETURN r.title AS title, r.description AS description, r.link AS link")
            resources = [dict(record) for record in result]
        return jsonify(resources), 200
    except Exception as e:
        print(f"Error fetching resources: {e}")
        return jsonify({"error": "Failed to fetch resources"}), 500

@app.route('/api/resources', methods=['POST'])
def add_resource():
    new_resource = request.json
    if 'title' not in new_resource or 'description' not in new_resource or 'link' not in new_resource:
        return jsonify({"error": "All fields are required"}), 400

    try:
        with driver.session() as session:
            session.run(
                "CREATE (r:Resource {title: $title, description: $description, link: $link})",
                title=new_resource['title'],
                description=new_resource['description'],
                link=new_resource['link']
            )
        return jsonify(new_resource), 201
    except Exception as e:
        print(f"Error adding resource: {e}")
        return jsonify({"error": "Failed to add resource"}), 500
    
@app.route('/api/products', methods=['GET', 'POST'])
def manage_products():
    if request.method == 'GET':
        return get_products()
    elif request.method == 'POST':
        return add_product()

def get_products():
    with driver.session() as session:
        result = session.run("""
            MATCH (main:MainProduct)-[:CONTAINS]->(p:Product)
            RETURN p
        """)
        products = [{
            "id": record["p"].id,
            "name": record["p"]["name"],
            "sku": record["p"]["sku"],
            "price": record["p"]["price"]
        } for record in result]
        return jsonify(products)

def add_product():
    data = request.json
    name = data.get('name')
    sku = data.get('sku')
    price = data.get('price')
    
    if not name or not sku or price is None:
        return jsonify({"error": "Missing product data"}), 400
    
    with driver.session() as session:
        # Check if main product node exists, create if not
        session.run("""
            MERGE (main:MainProduct)
            ON CREATE SET main.name = 'Main Product Node'
        """)
        
        # Create new product and link to main product node
        result = session.run("""
            MATCH (main:MainProduct)
            CREATE (p:Product {name: $name, sku: $sku, price: $price})
            CREATE (main)-[:CONTAINS]->(p)
            RETURN p
        """, name=name, sku=sku, price=price)
        
        new_product = result.single()
        if new_product:
            return jsonify({
                "message": "Product added successfully",
                "product": {
                    "id": new_product['p'].id,
                    "name": new_product['p']['name'],
                    "sku": new_product['p']['sku'],
                    "price": new_product['p']['price']
                }
            }), 201
        else:
            return jsonify({"error": "Failed to add product"}), 500
        
@app.route('/api/shipments', methods=['GET', 'POST'])
def shipments():
    if request.method == 'GET':
        return get_shipments()
    elif request.method == 'POST':
        return add_shipment()

def get_shipments():
    with driver.session() as session:
        result = session.run("""
            MATCH (main:MainShipment)-[:CONTAINS]->(s:Shipment)
            RETURN s
        """)
        shipments = [{
            "id": record["s"].id,
            "shipmentNumber": record["s"]["shipmentNumber"],
            "destination": record["s"]["destination"],
            "status": record["s"]["status"],
            "date": record["s"]["date"]
        } for record in result]
        return jsonify(shipments)

def add_shipment():
    data = request.json
    shipment_number = data.get('shipmentNumber')
    destination = data.get('destination')
    status = data.get('status')
    date = data.get('date')
    
    if not all([shipment_number, destination, status, date]):
        return jsonify({"error": "Missing shipment data"}), 400
    
    with driver.session() as session:
        # Check if main shipment node exists, create if not
        session.run("""
            MERGE (main:MainShipment)
            ON CREATE SET main.name = 'Main Shipment Node'
        """)
        
        # Create new shipment and link to main shipment node
        result = session.run("""
            MATCH (main:MainShipment)
            CREATE (s:Shipment {shipmentNumber: $shipment_number, destination: $destination, status: $status, date: $date})
            CREATE (main)-[:CONTAINS]->(s)
            RETURN s
        """, shipment_number=shipment_number, destination=destination, status=status, date=date)
        
        new_shipment = result.single()
        if new_shipment:
            return jsonify({
                "message": "Shipment added successfully",
                "shipment": {
                    "id": new_shipment['s'].id,
                    "shipmentNumber": new_shipment['s']['shipmentNumber'],
                    "destination": new_shipment['s']['destination'],
                    "status": new_shipment['s']['status'],
                    "date": new_shipment['s']['date']
                }
            }), 201
        else:
            return jsonify({"error": "Failed to add shipment"}), 500
        
@app.route('/api/orders', methods=['GET', 'POST'])
def orders():
    if request.method == 'GET':
        return get_orders()
    elif request.method == 'POST':
        return add_order()

def get_orders():
    with driver.session() as session:
        result = session.run("""
            MATCH (main:MainOrder)-[:CONTAINS]->(o:Order)
            RETURN o
        """)
        orders = [{
            "id": record["o"].id,
            "deliveryNumber": record["o"]["deliveryNumber"],
            "shippingAddress": record["o"]["shippingAddress"],
            "status": record["o"]["status"],
            "price": record["o"]["price"],
            "pieces": record["o"]["pieces"]
        } for record in result]
        return jsonify(orders)

def add_order():
    data = request.json
    delivery_number = data.get('deliveryNumber')
    shipping_address = data.get('shippingAddress')
    status = data.get('status')
    price = data.get('price')
    pieces = data.get('pieces')
    
    if not all([delivery_number, shipping_address, status, price is not None, pieces is not None]):
        return jsonify({"error": "Missing order data"}), 400
    
    with driver.session() as session:
        # Check if main order node exists, create if not
        session.run("""
            MERGE (main:MainOrder)
            ON CREATE SET main.name = 'Main Order Node'
        """)
        
        # Create new order and link to main order node
        result = session.run("""
            MATCH (main:MainOrder)
            CREATE (o:Order {deliveryNumber: $delivery_number, shippingAddress: $shipping_address, status: $status, price: $price, pieces: $pieces})
            CREATE (main)-[:CONTAINS]->(o)
            RETURN o
        """, delivery_number=delivery_number, shipping_address=shipping_address, status=status, price=price, pieces=pieces)
        
        new_order = result.single()
        if new_order:
            return jsonify({
                "message": "Order added successfully",
                "order": {
                    "id": new_order['o'].id,
                    "deliveryNumber": new_order['o']['deliveryNumber'],
                    "shippingAddress": new_order['o']['shippingAddress'],
                    "status": new_order['o']['status'],
                    "price": new_order['o']['price'],
                    "pieces": new_order['o']['pieces']
                }
            }), 201
        else:
            return jsonify({"error": "Failed to add order"}), 500




if __name__ == '__main__':
    try:
        app.run(debug=True)
    finally:
        driver.close()
