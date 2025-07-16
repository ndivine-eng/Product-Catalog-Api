const mongoose = require('mongoose');
const slugify = require('slugify');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true
    }
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

// Auto-generate slug from name before saving
categorySchema.pre('save', function (next) {
  if (this.name) {
    this.slug = slugify(this.name, { lower: true });
  }
  next();
});

// Prevent OverwriteModelError in development
module.exports = mongoose.models.Category || mongoose.model('Category', categorySchema);
