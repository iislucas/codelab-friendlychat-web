import { inject, Injectable } from '@angular/core';
import {
  Auth,
  authState,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  user,
  getAuth,
  User,
} from '@angular/fire/auth';
import { map, switchMap, firstValueFrom, filter, Observable } from 'rxjs';
import {
  doc,
  docData,
  DocumentReference,
  Firestore,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  addDoc,
  deleteDoc,
  collectionData,
  Timestamp,
  serverTimestamp,
  query,
  orderBy,
  limit,
  onSnapshot,
  DocumentData,
} from '@angular/fire/firestore';
import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from '@angular/fire/storage';
import { getToken, Messaging, onMessage } from '@angular/fire/messaging';
import { Router } from '@angular/router';

interface Message {
  name: string,
  text: string,
  profilePicUrl: string,
  timestamp: unknown,
  uid: string
}

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  firestore: Firestore = inject(Firestore);
  auth: Auth = inject(Auth);
  storage: Storage = inject(Storage);
  messaging: Messaging = inject(Messaging);
  router: Router = inject(Router);
  private provider = new GoogleAuthProvider();
  LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif?a';

  // Observable user
  user$ = user(this.auth);

  // Login Friendly Chat.
  login() {
    signInWithPopup(this.auth, this.provider).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      this.router.navigate(['/', 'chat']);
      return credential;
    })
  }

  // Logout of Friendly Chat.
  logout() {
    signOut(this.auth).then(() => {
      this.router.navigate(['/', 'login'])
      console.log('signed out');
    }).catch((error) => {
      console.log('sign out error: ' + error);
    })
  }

  // Adds a text or image message to Cloud Firestore.
  async addMessage(textMessage: string | null, imageUrl: string | null
  ): Promise<void | DocumentReference<DocumentData>> {
    let data: DocumentReference<DocumentData>;
    try {
      this.user$.subscribe(async (user) => {
        if (textMessage && textMessage.length > 0) {
          data = await addDoc(collection(this.firestore, 'messages'), {
            name: user?.displayName,
            text: textMessage,
            profilePicUrl: user?.photoURL,
            timestamp: serverTimestamp(),
            uid: user?.uid
          });
          console.log('data...', data);
        }
        else if (imageUrl && imageUrl.length > 0) {
          data = await addDoc(collection(this.firestore, 'messages'), {
            name: user?.displayName,
            imageUrl: imageUrl,
            profilePicUrl: user?.photoURL,
            timestamp: serverTimestamp(),
            uid: user?.uid
          });
        }
        return data;
      });
    }
    catch (error) {
      console.error('Error writing new message to Firebase Database', error);
      return;
    }
  }

  // Saves a new message to Cloud Firestore.
  saveTextMessage = async (messageText: string) => {
    // Add a new message entry to the Firebase database.
    return this.addMessage(messageText, null);
  };

  // Loads chat messages history and listens for upcoming ones.
  loadMessages = () => {
    // Create the query to load the last 12 messages and listen for new ones.
    const recentMessagesQuery = query(collection(this.firestore, 'messages'), orderBy('timestamp', 'desc'), limit(12));
    // Start listening to the query.
    return collectionData(recentMessagesQuery);
  }

  // Saves a new message containing an image in Firebase.
  // This first saves the image in Firebase storage.
  saveImageMessage = async (file: any) => {
    try {
      // 1 - You add a message with a loading icon that will get updated with the shared image.
      const messageRef = await this.addMessage(null, this.LOADING_IMAGE_URL);

      // 2 - Upload the image to Cloud Storage.
      const filePath = `${this.auth.currentUser?.uid}/${file.name}`;
      const newImageRef = ref(this.storage, filePath);
      const fileSnapshot = await uploadBytesResumable(newImageRef, file);

      // 3 - Generate a public URL for the file.
      const publicImageUrl = await getDownloadURL(newImageRef);

      // 4 - Update the chat message placeholder with the image's URL.
      messageRef ?
        await updateDoc(messageRef, {
          imageUrl: publicImageUrl,
          storageUri: fileSnapshot.metadata.fullPath
        }) : null;
    } catch (error) {
      console.error('There was an error uploading a file to Cloud Storage:', error);
    }
  }

  async updateData(path: string, data: any) { }

  async deleteData(path: string) { }

  getDocData(path: string) { }

  getCollectionData(path: string) { }

  async uploadToStorage(
    path: string,
    input: HTMLInputElement,
    contentType: any
  ) {
    return null;
  }
  // Requests permissions to show notifications.
  requestNotificationsPermissions = async () => { };

  saveMessagingDeviceToken = async () => { };
}
