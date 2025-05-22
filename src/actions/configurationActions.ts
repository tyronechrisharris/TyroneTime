
'use server';

import fs from 'fs/promises';
import path from 'path';
import type { ServerConfig } from '@/lib/zod-schemas';

// Resolve the path to config.json in the project root
const CONFIG_FILE_PATH = path.resolve(process.cwd(), 'config.json');

export async function saveConfiguration(config: ServerConfig): Promise<void> {
  try {
    // Convert the configuration object to a JSON string
    const jsonData = JSON.stringify(config, null, 2); // null, 2 for pretty printing
    // Write the JSON data to config.json
    await fs.writeFile(CONFIG_FILE_PATH, jsonData, 'utf-8');
  } catch (error) {
    console.error("Error saving configuration to config.json:", error);
    throw new Error("Failed to save configuration to local file.");
  }
}

export async function loadConfiguration(): Promise<ServerConfig | null> {
  try {
    // Read the contents of config.json
    const fileContents = await fs.readFile(CONFIG_FILE_PATH, 'utf-8');
    // Parse the JSON data into a ServerConfig object
    const configData = JSON.parse(fileContents) as ServerConfig;
    return configData;
  } catch (error: any) {
    // If the file doesn't exist, it's not an error, just return null
    if (error.code === 'ENOENT') {
      console.log("config.json not found. Using default configuration.");
      return null;
    }
    // For other errors, log them and re-throw
    console.error("Error loading configuration from config.json:", error);
    throw new Error("Failed to load configuration from local file.");
  }
}
