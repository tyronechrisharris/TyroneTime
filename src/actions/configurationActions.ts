'use server';

import { db } from '@/lib/firebase'; // Client SDK, ensure it's configured for server if no Admin SDK
import { doc, setDoc, getDoc, Timestamp } from 'firebase/firestore';
import type { ServerConfig } from '@/lib/zod-schemas';

const CONFIG_COLLECTION = 'server_configurations';
const CONFIG_DOC_ID = 'default_config';

export async function saveConfiguration(config: ServerConfig): Promise<void> {
  try {
    const configRef = doc(db, CONFIG_COLLECTION, CONFIG_DOC_ID);
    // Add a server timestamp for when the config was last updated
    const dataToSave = { ...config, updatedAt: Timestamp.now() };
    await setDoc(configRef, dataToSave);
  } catch (error) {
    console.error("Error saving configuration to Firestore:", error);
    throw new Error("Failed to save configuration.");
  }
}

export async function loadConfiguration(): Promise<ServerConfig | null> {
  try {
    const configRef = doc(db, CONFIG_COLLECTION, CONFIG_DOC_ID);
    const docSnap = await getDoc(configRef);

    if (docSnap.exists()) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { updatedAt, ...configData } = docSnap.data(); // Exclude server-generated timestamp if not part of ServerConfig type
      return configData as ServerConfig;
    } else {
      console.log("No such configuration document!");
      return null;
    }
  } catch (error) {
    console.error("Error loading configuration from Firestore:", error);
    throw new Error("Failed to load configuration.");
  }
}
