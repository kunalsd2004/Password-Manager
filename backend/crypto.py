from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
import base64
import os
from config import settings

class CryptoManager:
    def __init__(self):
        # Convert the encryption key to bytes if it's a string
        if isinstance(settings.encryption_key, str):
            self.key = settings.encryption_key.encode('utf-8')
        else:
            self.key = settings.encryption_key
        
        # Ensure the key is 32 bytes for AES-256
        if len(self.key) != 32:
            # Derive a 32-byte key using PBKDF2
            kdf = PBKDF2HMAC(
                algorithm=hashes.SHA256(),
                length=32,
                salt=b'password_manager_salt',
                iterations=100000,
            )
            self.key = kdf.derive(self.key)
    
    def encrypt(self, data: str) -> str:
        """Encrypt data using AES-256-GCM"""
        if not data:
            return ""
        
        # Generate a random nonce
        nonce = os.urandom(12)
        
        # Create AESGCM cipher
        aesgcm = AESGCM(self.key)
        
        # Encrypt the data
        ciphertext = aesgcm.encrypt(nonce, data.encode('utf-8'), None)
        
        # Combine nonce and ciphertext and encode as base64
        encrypted_data = nonce + ciphertext
        return base64.b64encode(encrypted_data).decode('utf-8')
    
    def decrypt(self, encrypted_data: str) -> str:
        """Decrypt data using AES-256-GCM"""
        if not encrypted_data:
            return ""
        
        try:
            # Decode from base64
            encrypted_bytes = base64.b64decode(encrypted_data.encode('utf-8'))
            
            # Extract nonce (first 12 bytes) and ciphertext
            nonce = encrypted_bytes[:12]
            ciphertext = encrypted_bytes[12:]
            
            # Create AESGCM cipher
            aesgcm = AESGCM(self.key)
            
            # Decrypt the data
            plaintext = aesgcm.decrypt(nonce, ciphertext, None)
            return plaintext.decode('utf-8')
        
        except Exception as e:
            raise ValueError(f"Failed to decrypt data: {str(e)}")

# Create a global instance
crypto_manager = CryptoManager()

