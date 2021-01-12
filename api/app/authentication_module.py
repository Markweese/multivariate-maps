import os
from pymongo import MongoClient

class authentication:
    # Init
    def __init__(self, db_connect):
        self.client = db_connect
        print('init authentication_module')

    # Methods

    # autheticate_session
    # authenticate a user session
    # id: takes the user email
    # token: takes the user token
    def authenticate_session(self, request):
        if 'user' in request.headers and 'token' in request.headers:
            user = request.headers.get('user')
            reqToken = request.headers.get('token')
            sessionToken = self.client[os.environ['MONGO_DB']].users.find_one({'email': user}, {'_id': 0, 'sessionToken': 1})

            if reqToken == sessionToken['sessionToken']:
                return True
            else:
                return False
        else:
            return False

    # is super admin
    # authenticate the gcloud cron job
    # id: takes the user email
    # token: takes the user token
    def is_super_admin(self, request):
        if 'user' in request.headers and 'token' in request.headers:
            user = request.headers.get('user')
            reqToken = request.headers.get('token')
            sessionToken = self.client[os.environ['MONGO_DB']].users.find_one({'email': user}, {'_id': 0, 'sessionToken': 1})

            if reqToken == sessionToken['sessionToken'] and request.headers.get('user') == 'checktheflows@gmail.com':
                return True
            else:
                return False
        else:
            return False
