import { 
  type User, 
  type InsertUser, 
  type Property, 
  type InsertProperty,
  type PropertyLike,
  type InsertPropertyLike
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Property methods
  getProperty(id: string): Promise<Property | undefined>;
  getAllProperties(): Promise<Property[]>;
  createProperty(property: InsertProperty): Promise<Property>;
  updateProperty(id: string, property: Partial<InsertProperty>): Promise<Property | undefined>;
  deleteProperty(id: string): Promise<boolean>;
  incrementPropertyViews(id: string): Promise<void>;
  
  // Property likes methods
  likeProperty(userId: string, propertyId: string): Promise<PropertyLike>;
  unlikeProperty(userId: string, propertyId: string): Promise<boolean>;
  getUserLikedProperties(userId: string): Promise<string[]>;
  isPropertyLikedByUser(userId: string, propertyId: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private properties: Map<string, Property>;
  private propertyLikes: Map<string, PropertyLike>;

  constructor() {
    this.users = new Map();
    this.properties = new Map();
    this.propertyLikes = new Map();
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Create admin user
    const adminId = randomUUID();
    const admin: User = {
      id: adminId,
      email: "admin@imoveiscrm.com",
      password: "admin123", // In production, this should be hashed
      role: "admin",
      name: "Administrador",
      createdAt: new Date(),
    };
    this.users.set(adminId, admin);

    // Create sample client
    const clientId = randomUUID();
    const client: User = {
      id: clientId,
      email: "cliente@exemplo.com",
      password: "cliente123",
      role: "client",
      name: "Cliente Exemplo",
      createdAt: new Date(),
    };
    this.users.set(clientId, client);
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser,
      name: insertUser.name ?? null,
      role: insertUser.role ?? "client",
      id,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  // Property methods
  async getProperty(id: string): Promise<Property | undefined> {
    return this.properties.get(id);
  }

  async getAllProperties(): Promise<Property[]> {
    return Array.from(this.properties.values());
  }

  async createProperty(insertProperty: InsertProperty): Promise<Property> {
    const id = randomUUID();
    const property: Property = {
      ...insertProperty,
      id,
      views: 0,
      createdAt: new Date(),
    };
    this.properties.set(id, property);
    return property;
  }

  async updateProperty(
    id: string,
    updates: Partial<InsertProperty>
  ): Promise<Property | undefined> {
    const property = this.properties.get(id);
    if (!property) return undefined;

    const updated: Property = {
      ...property,
      ...updates,
    };
    this.properties.set(id, updated);
    return updated;
  }

  async deleteProperty(id: string): Promise<boolean> {
    return this.properties.delete(id);
  }

  async incrementPropertyViews(id: string): Promise<void> {
    const property = this.properties.get(id);
    if (property) {
      property.views += 1;
      this.properties.set(id, property);
    }
  }

  // Property likes methods
  async likeProperty(userId: string, propertyId: string): Promise<PropertyLike> {
    const id = randomUUID();
    const like: PropertyLike = {
      id,
      userId,
      propertyId,
      createdAt: new Date(),
    };
    this.propertyLikes.set(id, like);
    return like;
  }

  async unlikeProperty(userId: string, propertyId: string): Promise<boolean> {
    const like = Array.from(this.propertyLikes.values()).find(
      (l) => l.userId === userId && l.propertyId === propertyId
    );
    if (like) {
      return this.propertyLikes.delete(like.id);
    }
    return false;
  }

  async getUserLikedProperties(userId: string): Promise<string[]> {
    return Array.from(this.propertyLikes.values())
      .filter((like) => like.userId === userId)
      .map((like) => like.propertyId);
  }

  async isPropertyLikedByUser(userId: string, propertyId: string): Promise<boolean> {
    return Array.from(this.propertyLikes.values()).some(
      (like) => like.userId === userId && like.propertyId === propertyId
    );
  }
}

export const storage = new MemStorage();
