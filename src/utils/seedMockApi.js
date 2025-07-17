// Utility to seed MockAPI with sample data
import { ProductsAPI, CategoriesAPI, UsersAPI } from "../services/mockApiService"
import { sampleCategories, sampleProducts, sampleUsers } from "../data/sampleData"

class MockApiSeeder {
  constructor() {
    this.seeded = false
    this.seedingInProgress = false
  }

  async checkIfSeeded() {
    try {
      const products = await ProductsAPI.getAll()
      const categories = await CategoriesAPI.getAll()

      // Consider seeded if we have at least some data
      this.seeded = products.length > 0 && categories.length > 0
      return this.seeded
    } catch (error) {
      console.warn("Could not check if MockAPI is seeded:", error.message)
      return false
    }
  }

  async seedCategories() {
    console.log("🌱 Seeding categories...")
    const seedPromises = sampleCategories.map(async (category) => {
      try {
        await CategoriesAPI.create(category)
        console.log(`✅ Created category: ${category.name}`)
      } catch (error) {
        console.warn(`⚠️ Failed to create category ${category.name}:`, error.message)
      }
    })

    await Promise.allSettled(seedPromises)
    console.log("✅ Categories seeding completed")
  }

  async seedProducts() {
    console.log("🌱 Seeding products...")
    const seedPromises = sampleProducts.map(async (product) => {
      try {
        await ProductsAPI.create(product)
        console.log(`✅ Created product: ${product.name}`)
      } catch (error) {
        console.warn(`⚠️ Failed to create product ${product.name}:`, error.message)
      }
    })

    await Promise.allSettled(seedPromises)
    console.log("✅ Products seeding completed")
  }

  async seedUsers() {
    console.log("🌱 Seeding users...")
    const seedPromises = sampleUsers.map(async (user) => {
      try {
        await UsersAPI.create(user)
        console.log(`✅ Created user: ${user.email}`)
      } catch (error) {
        console.warn(`⚠️ Failed to create user ${user.email}:`, error.message)
      }
    })

    await Promise.allSettled(seedPromises)
    console.log("✅ Users seeding completed")
  }

  async seedAll() {
    if (this.seedingInProgress) {
      console.log("⏳ Seeding already in progress...")
      return false
    }

    if (await this.checkIfSeeded()) {
      console.log("✅ MockAPI already seeded")
      return true
    }

    this.seedingInProgress = true
    console.log("🚀 Starting MockAPI seeding process...")

    try {
      // Seed in order: categories first, then products, then users
      await this.seedCategories()
      await this.seedProducts()
      await this.seedUsers()

      this.seeded = true
      console.log("🎉 MockAPI seeding completed successfully!")
      return true
    } catch (error) {
      console.error("❌ MockAPI seeding failed:", error)
      return false
    } finally {
      this.seedingInProgress = false
    }
  }

  async clearAll() {
    console.log("🧹 Clearing all MockAPI data...")

    try {
      // Get all data
      const [products, categories, users] = await Promise.all([
        ProductsAPI.getAll(),
        CategoriesAPI.getAll(),
        UsersAPI.getAll(),
      ])

      // Delete all products
      const deleteProductPromises = products.map((product) => ProductsAPI.delete(product.id))
      await Promise.allSettled(deleteProductPromises)
      console.log("✅ Cleared all products")

      // Delete all categories
      const deleteCategoryPromises = categories.map((category) => CategoriesAPI.delete(category.id))
      await Promise.allSettled(deleteCategoryPromises)
      console.log("✅ Cleared all categories")

      // Delete all users
      const deleteUserPromises = users.map((user) => UsersAPI.delete(user.id))
      await Promise.allSettled(deleteUserPromises)
      console.log("✅ Cleared all users")

      this.seeded = false
      console.log("🎉 MockAPI cleared successfully!")
      return true
    } catch (error) {
      console.error("❌ Failed to clear MockAPI:", error)
      return false
    }
  }

  async reseed() {
    console.log("🔄 Reseeding MockAPI...")
    await this.clearAll()
    return await this.seedAll()
  }
}

// Export singleton instance
const mockApiSeeder = new MockApiSeeder()
export default mockApiSeeder

// Export individual methods for convenience
export const { checkIfSeeded, seedAll, clearAll, reseed, seedCategories, seedProducts, seedUsers } = mockApiSeeder
