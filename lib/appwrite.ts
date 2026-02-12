import { CreateUserParams, SignInParams } from "@/type";
import { Account, AppwriteException, Avatars, Client, Databases, ID, Query, Storage } from "react-native-appwrite";

export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    platform: 'com.food.delivery.app',
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    databaseId: '698bf77600048039f992',
    bucketId: '698dbf8c0016d9a37f2b',
    userCollectionId: 'user',
    categoriesCollectionId: 'categories',
    menuCollectionId: 'menu',
    customizationsCollectionId: 'customizations',
    menuCustomizationsCollectionId: 'menu_customizations'
}

export const client = new Client();
client
.setEndpoint(appwriteConfig.endpoint)
.setProject(appwriteConfig.projectId)
.setPlatform(appwriteConfig.platform)

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);

const clearCurrentSession = async () => {
    try{
        await account.deleteSession("current");
    }catch(error){
        // No active session to clear.
    }
}

const upsertUserProfile = async ({
    accountId,
    email,
    name,
}: {
    accountId: string;
    email: string;
    name: string;
}) => {
    const avatarUrl = avatars.getInitialsURL(name);
    const payload = {
        accountId,
        email,
        name,
        avatar: avatarUrl,
    };

    try{
        return await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            accountId,
            payload
        );
    }catch(error){
        if(error instanceof AppwriteException && error.code === 409){
            return await databases.updateDocument(
                appwriteConfig.databaseId,
                appwriteConfig.userCollectionId,
                accountId,
                payload
            );
        }

        throw error;
    }
}

export const createUser = async({email, password, name}: CreateUserParams) => {
    try{
        const newAccount = await account.create(ID.unique(), email, password, name);
        if(!newAccount) throw Error;
        await signIn({email, password});
        const avatarUrl = avatars.getInitialsURL(name);
        return await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            { email, name, avatar: avatarUrl, accountId: newAccount.$id }
        )
    }catch(error){
        throw new Error(error as string);
    }
}  
export const signIn = async({email, password}: SignInParams) => {
    try{
        await clearCurrentSession();
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    }catch(e){
        throw new Error(e as string);
    }
}

export const getCurrentUser = async() => {
    try{
        const currentAccount = await account.get();
        if(!currentAccount) throw Error;
        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )
        if(!currentUser) throw Error;
        return currentUser.documents[0];
    }catch(e){
        console.log(e);
        throw new Error(e as string);
    }
}