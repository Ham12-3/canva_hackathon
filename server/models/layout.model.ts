import { Schema, model, Document } from "mongoose";

// Interfaces for each schema
interface FaqItem extends Document {
  question: string;
  answer: string;
}

interface Category extends Document {
  title: string;
}

interface BannerImage {
  public_id: string;
  url: string;
}

// The main layout interface
interface Layout extends Document {
  type: string; // "Banner", "FAQ", "categories"
  faq?: FaqItem[];
  categories?: Category[];
  banner?: {
    image: BannerImage;
    title: string;
    subTitle: string;
  };
}

// Schema definitions
const faqSchema = new Schema<FaqItem>({
  question: { type: String, required: true },
  answer: { type: String, required: true },
});

const categorySchema = new Schema<Category>({
  title: { type: String, required: true },
});

const bannerImageSchema = new Schema<BannerImage>({
  public_id: { type: String, required: true },
  url: { type: String, required: true },
});

const layoutSchema = new Schema<Layout>(
  {
    type: { type: String, required: true, unique: true },
    faq: [faqSchema], // This will store an array of FAQ items
    categories: [categorySchema], // This will store an array of Category items
    banner: {
      image: bannerImageSchema,
      title: { type: String },
      subTitle: { type: String },
    },
  },
  { timestamps: true } // Add timestamps for createdAt and updatedAt
);

// Create and export the model
const LayoutModel = model<Layout>("Layout", layoutSchema);

export default LayoutModel;
