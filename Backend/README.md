backend

python -m venv venv
venv\Scripts\activate 
pip install -r requirements.txt
python -m app.main

uvicorn app.main:app --reload


orm run create the table from orm
 python init_db.py
