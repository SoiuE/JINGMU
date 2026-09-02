/* ===================================================
   JINGMU — Product Data Store
   All product info, descriptions, and category mappings
   =================================================== */

const PRODUCTS = [
    {
        id: 1,
        name: "Sweet Ruffle Dress",
        price: 18.99,
        img: "images/product1.jpg",
        category: "adult",
        categoryLabel: "Adult Apparel",
        description: "A charming ruffle dress crafted from lightweight breathable fabric. Features delicate layered ruffles along the hemline and a flattering A-line silhouette. Perfect for spring outings, brunch dates, or casual summer days. The soft pastel pink tone adds a sweet feminine touch to any wardrobe."
    },
    {
        id: 2,
        name: "Soft Knit Sweater",
        price: 22.99,
        img: "images/product2.jpg",
        category: "adult",
        categoryLabel: "Adult Apparel",
        description: "Ultra-soft cable-knit sweater in a cozy cream tone. Made from premium acrylic-wool blend that feels gentle against the skin. Features a relaxed drop-shoulder fit with ribbed cuffs and hem. Ideal for layering during cool autumn evenings or pairing with your favorite jeans for a casual-chic look."
    },
    {
        id: 3,
        name: "Cute Print Teen Tee",
        price: 11.99,
        img: "images/product3.jpg",
        category: "teen",
        categoryLabel: "Teen Clothing",
        description: "Fun graphic print t-shirt designed for trendy teens. Made from 100% soft cotton with a relaxed unisex fit. The adorable kawaii-inspired print is screen-printed for long-lasting vibrancy. Available in multiple pastel colorways — perfect for school, hanging out with friends, or weekend adventures."
    },
    {
        id: 4,
        name: "High Waist Skirt",
        price: 16.99,
        img: "images/product4.jpg",
        category: "teen",
        categoryLabel: "Teen Clothing",
        description: "Flattering high-waist mini skirt with a subtle flare silhouette. Features a comfortable elastic waistband and soft cotton-blend fabric that moves with you. The versatile solid color pairs easily with crop tops, tees, or blouses. A wardrobe essential for creating cute everyday outfits."
    },
    {
        id: 5,
        name: "Bow Pearl Hair Clips",
        price: 7.99,
        img: "images/product5.jpg",
        category: "hair",
        categoryLabel: "Hair Decorations",
        description: "Set of adorable bow-shaped hair clips adorned with faux pearls. Crafted with durable alloy clips that hold securely without pulling hair. The sweet pastel finish and lustrous pearl accents add an elegant-cute touch to any hairstyle. Great for daily wear, parties, or special occasions."
    },
    {
        id: 6,
        name: "Dainty Pendant Necklace",
        price: 13.50,
        img: "images/product6.jpg",
        category: "accessory",
        categoryLabel: "Fashion Accessories",
        description: "Delicate chain necklace featuring a minimalist pendant charm. Made from high-quality alloy with a 14K gold-tone finish that resists tarnishing. The adjustable chain length ensures a perfect fit for any neckline. A versatile accessory that transitions effortlessly from casual daywear to elegant evening looks."
    },
    {
        id: 7,
        name: "Pastel Ceramic Water Cup",
        price: 9.20,
        img: "images/product7.jpg",
        category: "home",
        categoryLabel: "Home & Living",
        description: "Adorable ceramic drinking cup with a smooth matte pastel finish. Features a comfortable handle and 350ml capacity — perfect for your morning coffee, afternoon tea, or daily hydration. The minimalist design with subtle embossed details makes it a charming addition to any desk or kitchen."
    },
    {
        id: 8,
        name: "Cute Desktop Storage Box",
        price: 12.80,
        img: "images/product8.jpg",
        category: "home",
        categoryLabel: "Home & Living",
        description: "Multi-functional desktop organizer in a sweet cream color. Features multiple compartments for storing stationery, cosmetics, jewelry, or small accessories. Made from durable PP material with a smooth rounded design. Keeps your space tidy while adding a decorative touch to your vanity or workspace."
    },
    {
        id: 9,
        name: "Sweet Canvas Shoulder Bag",
        price: 19.90,
        img: "images/product9.jpg",
        category: "accessory",
        categoryLabel: "Fashion Accessories",
        description: "Charming canvas shoulder bag with a relaxed slouchy silhouette. Features a spacious main compartment with interior pocket, magnetic snap closure, and adjustable strap. The sweet pastel tone and minimalist design make it the perfect everyday bag for school, shopping, or casual outings."
    },
    {
        id: 10,
        name: "Fluffy House Slippers",
        price: 10.99,
        img: "images/product10.jpg",
        category: "home",
        categoryLabel: "Home & Living",
        description: "Ultra-plush indoor slippers with fluffy faux-fur upper and cushioned foam sole. The soft cloud-like texture pampers your feet with every step. Features a non-slip rubber outsole for safety on smooth floors. Available in dreamy pastel shades — the perfect treat for cozy nights at home."
    }
];

/* Category definitions for filter tabs */
const CATEGORIES = [
    { key: "all",    label: "All Products" },
    { key: "adult",  label: "Adult Apparel" },
    { key: "teen",   label: "Teen Clothing" },
    { key: "accessory", label: "Accessories" },
    { key: "hair",   label: "Hair Decor" },
    { key: "home",   label: "Home & Living" }
];
