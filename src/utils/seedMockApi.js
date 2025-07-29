// Seed MockAPI with sample data
import {
  sampleProducts,
  sampleCategories,
  sampleUsers,
  sampleOrders,
  sampleReviews,
  sampleWishlist,
  sampleCart,
} from "../data/sampleData"
import {
  ProductsAPI,
  CategoriesAPI,
  UsersAPI,
  OrdersAPI,
  ReviewsAPI,
  WishlistAPI,
  CartAPI,
} from "../services/mockApiService"

// Seeding configuration
const SEED_CONFIG = {
  clearExisting: true,
  batchSize: 5,
  delayBetweenBatches: 1000,
}

// Utility function to delay execution
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Utility function to process items in batches
const processBatch = async (items, processFn, batchSize = SEED_CONFIG.batchSize) => {
  const results = []

  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize)
    console.log(`Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(items.length / batchSize)}...`)

    const batchResults = await Promise.all(
      batch.map(async (item, index) => {
        try {
          return await processFn(item, i + index)
        } catch (error) {
          console.error(`Failed to process item ${i + index}:`, error)
          return null
        }
      }),
    )

    results.push(...batchResults.filter((result) => result !== null))

    // Delay between batches to avoid overwhelming the API
    if (i + batchSize < items.length) {
      await delay(SEED_CONFIG.delayBetweenBatches)
    }
  }

  return results
}

// Clear existing data from an API endpoint
const clearEndpoint = async (api, endpointName) => {
  if (!SEED_CONFIG.clearExisting) return

  try {
    console.log(`🗑️ Clearing existing ${endpointName}...`)
    const existingItems = await api.getAll()

    if (existingItems.length > 0) {
      await processBatch(existingItems, async (item) => {
        await api.delete(item.id)
      })
      console.log(`✅ Cleared ${existingItems.length} existing ${endpointName}`)
    } else {
      console.log(`ℹ️ No existing ${endpointName} to clear`)
    }
  } catch (error) {
    console.warn(`⚠️ Failed to clear ${endpointName}:`, error.message)
  }
}

// Seed products
const seedProducts = async () => {
  console.log("\n📦 Seeding Products...")

  await clearEndpoint(ProductsAPI, "products")

  const results = await processBatch(sampleProducts, async (product) => {
    const createdProduct = await ProductsAPI.create(product)
    console.log(`✅ Created product: ${createdProduct.name}`)
    return createdProduct
  })

  console.log(`🎉 Successfully seeded ${results.length} products`)
  return results
}

// Seed categories
const seedCategories = async () => {
  console.log("\n📂 Seeding Categories...")

  await clearEndpoint(CategoriesAPI, "categories")

  const results = await processBatch(sampleCategories, async (category) => {
    const createdCategory = await CategoriesAPI.create(category)
    console.log(`✅ Created category: ${createdCategory.name}`)
    return createdCategory
  })

  console.log(`🎉 Successfully seeded ${results.length} categories`)
  return results
}

// Seed users
const seedUsers = async () => {
  console.log("\n👥 Seeding Users...")

  await clearEndpoint(UsersAPI, "users")

  const results = await processBatch(sampleUsers, async (user) => {
    const createdUser = await UsersAPI.create(user)
    console.log(`✅ Created user: ${createdUser.email}`)
    return createdUser
  })

  console.log(`🎉 Successfully seeded ${results.length} users`)
  return results
}

// Seed orders
const seedOrders = async () => {
  console.log("\n📋 Seeding Orders...")

  await clearEndpoint(OrdersAPI, "orders")

  const results = await processBatch(sampleOrders, async (order) => {
    const createdOrder = await OrdersAPI.create(order)
    console.log(`✅ Created order: ${createdOrder.id}`)
    return createdOrder
  })

  console.log(`🎉 Successfully seeded ${results.length} orders`)
  return results
}

// Seed reviews
const seedReviews = async () => {
  console.log("\n⭐ Seeding Reviews...")

  await clearEndpoint(ReviewsAPI, "reviews")

  const results = await processBatch(sampleReviews, async (review) => {
    const createdReview = await ReviewsAPI.create(review)
    console.log(`✅ Created review: ${createdReview.title}`)
    return createdReview
  })

  console.log(`🎉 Successfully seeded ${results.length} reviews`)
  return results
}

// Seed wishlist
const seedWishlist = async () => {
  console.log("\n💝 Seeding Wishlist...")

  await clearEndpoint(WishlistAPI, "wishlist")

  const results = await processBatch(sampleWishlist, async (wishlistItem) => {
    const createdItem = await WishlistAPI.create(wishlistItem)
    console.log(`✅ Created wishlist item: ${createdItem.id}`)
    return createdItem
  })

  console.log(`🎉 Successfully seeded ${results.length} wishlist items`)
  return results
}

// Seed cart
const seedCart = async () => {
  console.log("\n🛒 Seeding Cart...")

  await clearEndpoint(CartAPI, "cart")

  const results = await processBatch(sampleCart, async (cartItem) => {
    const createdItem = await CartAPI.create(cartItem)
    console.log(`✅ Created cart item: ${createdItem.id}`)
    return createdItem
  })

  console.log(`🎉 Successfully seeded ${results.length} cart items`)
  return results
}

// Main seeding function
export const seedMockAPI = async () => {
  console.log("🌱 Starting MockAPI seeding process...")
  console.log(`Configuration: Clear existing: ${SEED_CONFIG.clearExisting}, Batch size: ${SEED_CONFIG.batchSize}`)

  const startTime = Date.now()
  const results = {}

  try {
    // Seed in order of dependencies
    results.categories = await seedCategories()
    results.products = await seedProducts()
    results.users = await seedUsers()
    results.orders = await seedOrders()
    results.reviews = await seedReviews()
    results.wishlist = await seedWishlist()
    results.cart = await seedCart()

    const endTime = Date.now()
    const duration = ((endTime - startTime) / 1000).toFixed(2)

    console.log("\n🎉 MockAPI seeding completed successfully!")
    console.log(`⏱️ Total time: ${duration} seconds`)
    console.log("\n📊 Seeding Summary:")
    console.log(`   Categories: ${results.categories?.length || 0}`)
    console.log(`   Products: ${results.products?.length || 0}`)
    console.log(`   Users: ${results.users?.length || 0}`)
    console.log(`   Orders: ${results.orders?.length || 0}`)
    console.log(`   Reviews: ${results.reviews?.length || 0}`)
    console.log(`   Wishlist Items: ${results.wishlist?.length || 0}`)
    console.log(`   Cart Items: ${results.cart?.length || 0}`)

    return results
  } catch (error) {
    console.error("❌ MockAPI seeding failed:", error)
    throw error
  }
}

// Export individual seeding functions for selective use
export { seedProducts, seedCategories, seedUsers, seedOrders, seedReviews, seedWishlist, seedCart }

// Utility function to check if seeding is needed
export const checkSeedingStatus = async () => {
  try {
    const [products, categories, users] = await Promise.all([
      ProductsAPI.getAll(),
      CategoriesAPI.getAll(),
      UsersAPI.getAll(),
    ])

    const isEmpty = products.length === 0 && categories.length === 0 && users.length === 0

    return {
      isEmpty,
      counts: {
        products: products.length,
        categories: categories.length,
        users: users.length,
      },
    }
  } catch (error) {
    console.error("Failed to check seeding status:", error)
    return { isEmpty: true, counts: {} }
  }
}
