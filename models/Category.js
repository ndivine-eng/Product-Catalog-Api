const mongoose = require('mongoose');
const slugify = require('slugify');

// Define the schema for categories
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,   // Name is required
      unique: true,     // No duplicate category names
      trim: true        // Remove surrounding whitespace
    },
    description: {
      type: String,
      trim: true        // Optional description, also trimmed
    },
    slug: {
      type: String,
      unique: true,     // Unique slug for SEO-friendly URLs
      lowercase: true,  // Always store as lowercase
      trim: true
    }
  },
  {
    timestamps: true // Automatically adds createdAt and updatedAt fields
  }
);

// Middleware to auto-generate slug from the name before saving to DB
categorySchema.pre('save', function (next) {
  if (this.name) {
    this.slug = slugify(this.name, { lower: true });
  }
  next();
});

// Prevent OverwriteModelError in development environments with hot reloads
module.exports = mongoose.models.Category || mongoose.model('Category', categorySchema);
