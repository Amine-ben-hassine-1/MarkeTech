import admin from 'firebase-admin';

// Initialisation avec les informations de votre fichier de clé de service
admin.initializeApp({
  credential: admin.credential.cert({
    "type": "service_account",
    "project_id": "projet-7e51d",
    "private_key_id": "fd49e4c2ffbfd58c2a1771729fc8e905f4956d93",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCacRuTZdrmsJ7m\nh8siX1Ac53bICoQnq5tzRP4DhIslyGzSUBZ9uuIWmLVxlMhZ8OcJ9T03bTRC50NQ\ne7kpUqHMFtJdoach/nabcdXXFUVGGuILWXI32jkDoO3tQAJJaTsFKSq2kNOYqJTd\nMXCcuaoPgblXynFPzJ8Kv5l92Tu/LDjBcvXVbJ3ysJxK2KFw5WsgiRdlDd3RhRyI\ntQ1x9+wF1HfkFDTn7dR33h8Fg+Wnk6JqyMkxuI86dL88r2T679PPWgTcNJ6DBKPH\n40r9i6QMKRv/uPrPbIFma0wdBDEIJtV9jSU95WuME7JTKzL1I8KkFtyCkwmYsHIh\n2lsRz0G/AgMBAAECggEAOQeoZ6sWhNZWrwkY9VXd5vaAEcl0WJPRgOTKqfDhUy/q\nI1VooMAIadC1O751p2TCZBZ3pwZ/5G6ymD8/ticp0QviXanqZi6pjKgiD1zu6j7W\nFtvORhqisBjWkyPuVD50CWlUuPrM8BPceLufenhC+JvuHaGHazDDz/vFicfUfLib\ntr5DQ8x0tEkTXYIvygK9oczyA0BFRS+071ZZ7/6dCRM+WLVxJRdjEkD9CvO0vPA6\ndFT1tXKKKCpC4sfNxVH/KqSoi+d6jw6vCGYFVkYQkOCsGxRKjdX05vuqWHcGDim5\n2LCLKbD19geFQ1vPCCRRiltaKqsZf8op7qVAV5z/XQKBgQDaLmN/l7FS9AtknCcV\nSRBYStRgfKRvVHBZqfEHv7qEJ9Oy7OxRRgD/IaAgWS8xJ9pK4pqGnDASVQFlHiDK\nS9vxeO2Z+uuNUGBTmib6m45+CGuJJQSCLeb+af2ji+sEMPTwFhyTjqjeQasyAcyg\nvEFfCHjAlb7zQx284EEnLuiLTQKBgQC1NlYsIl5XaTwOndd+dGG/XGzKEtqwGHtV\nFThA7lhelonT8IUqMzDzVzmuV5yqzWlNacY43nJbYytQNQHpkflVL0URzK8VqrE9\nKc4hcZp8h6DPus//89IPGJ/DrXXLDuRWAW80vxY4SJl5xBBV1MykuzX4h6j+qqBJ\nyGVM58pDOwKBgQCjiyQwDx/vY1lq6BXvwZ3L4QOC88s6XFv/CgDPYytHRqdMNoYJ\ngeTbWXQy60cRnKLngSZ9gnQSOb/a8RN5MBXE0nWf91M70STzZdiT/6h21o7s9V+E\nyS2eRQrH3eijcqMXmCuBe+0e9LCDwo+FaLfDqZECIv1IUWXoH10XJvVO/QKBgHmW\nRMmGIfDanj5ccAvcAP4KAMCxV+SR+KbE/yKqCcclkMMQ/firsmuEGiK9jFQaUU5s\n62Ca+PYSmyxM9MSIelhKyDhCMzQBfLzCQRm1hOeLhT38ZbWiHk6cwg3kZEXj7xc6\nDSjCEiGfrMLD6AX/K3RYXMUuGRkO2U/IUxf/6nmjAoGBAJ3pv0qX5mpDFSinc0vo\n1RGrsIcmD3ekn4egLLcLRCUu2ruwgF68FoPvZSPSvXKoKxIJ+768GtQngyDueIhO\nrVNAJfLW7EVa409mcijJG1usHePAEYqEBqao3Mn0Vhbn0Bv1OfTIy9bOK9eHwjYS\nVeo9YcUtt+pKEN8cwJ0v9ree\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-ffsd2@projet-7e51d.iam.gserviceaccount.com",
    "client_id": "109057518590871789747",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ffsd2%40projet-7e51d.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  }),
  databaseURL: 'https://projet-7e51d.firebaseio.com', // Remplacez par l'URL de votre base de données Firebase
});

// Exporter l'objet Firestore
const db = admin.firestore();

export { db };
