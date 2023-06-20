import { KeyPairDto } from '../../routes/connection/models/connection.dto';
export const example_key_values :KeyPairDto= {
    publicKey: "J6VkDnoF7HXTutP2mnBv8dsoFfNw8kinQCfGMhdUqizz",
    secretKey: "3hFnCW6nUw2e4t4VqdxtQktBCeQaZRYWkQGaLNouryrYrJSUnDFV8gGqLZbhjfyEFYCEp85hwwnPfUb3FfvwY9Gz"
  }

  /**
 * Constants used throughout the samples
 */

import { Cluster } from '@solana/web3.js';

export const DEVNET_RPC_URL = 'https://api.devnet.solana.com';

export const CLUSTER: Cluster = 'devnet';

/**
 * ONLY FOR SAMPLES NEVER EVER STORE YOUR/ANYONE'S PRIVATE KEY IN PLAIN TEXT
 * TODO: Insert your private key here
 */
