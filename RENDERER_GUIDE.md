# Static Renderer Guide

## Overview

The Page Builder now includes a **Static Renderer** mode that allows you to preview your page as a final, rendered output. This is perfect for seeing how your page will look to end users.

## Features

### 🔄 Preview Toggle

- **Builder Mode**: Full editing interface with component palette, canvas, and inspector
- **Preview Mode**: Clean, read-only view of your rendered page

### 📊 Product Summary Page Example

The application comes pre-loaded with a comprehensive product summary page that demonstrates:

- **Text Components**: Dynamic text with dataset interpolation
- **Number Fields**: Display numeric values from dataset
- **Formula Fields**: Calculate values using dataset variables
- **Buttons**: Interactive elements

### 🎯 Key Components

1. **Product Summary Report** - Main title
2. **Product Name** - Dynamic text showing `{productName}`
3. **Price** - Number field displaying `price` from dataset
4. **Quantity Sold** - Number field displaying `quantitySold` from dataset
5. **Total Revenue** - Formula field calculating `{price} * {quantitySold}`
6. **Average Price per Unit** - Formula field showing `{price}`
7. **Status** - Dynamic text showing `{status}`
8. **Generate Report** - Action button

## How to Use

### 1. Load Sample Data

1. In Builder Mode, go to the Dataset section in the left sidebar
2. Click the **"Sample"** button to load a pre-configured dataset
3. The dataset includes:
   ```json
   {
     "productName": "Premium Wireless Headphones",
     "price": 299.99,
     "quantitySold": 150,
     "status": "In Stock",
     "category": "Electronics",
     "rating": 4.8,
     "reviews": 324
   }
   ```

### 2. Switch to Preview Mode

1. Toggle the switch in the header from "Builder Mode" to "Preview Mode"
2. Your page will render as a clean, static output
3. All dataset values will be interpolated and formulas calculated

### 3. Customize Your Page

1. Switch back to Builder Mode
2. Add, remove, or modify components using the component palette
3. Use the inspector to edit component properties
4. Update the dataset with your own data
5. Switch back to Preview Mode to see the results

## Dataset Interpolation

### Text Components

Use `{keyName}` syntax in text labels to display dataset values:

- `"Product: {productName}"` → `"Product: Premium Wireless Headphones"`
- `"Status: {status}"` → `"Status: In Stock"`

### Formula Fields

Use dataset keys in mathematical expressions:

- `"{price} * {quantitySold}"` → `"299.99 * 150"` = `44998.5`
- `"{price}"` → `299.99`

### Number Fields

Set the `datasetKey` attribute to automatically display dataset values.

## Technical Details

### Static Renderer Component

- **File**: `src/components/StaticRenderer.tsx`
- **Purpose**: Renders components in read-only mode
- **Props**: `components`, `dataset`, `title`

### Preview Toggle

- **Location**: Header section
- **Functionality**: Switches between Builder and Preview modes
- **State Management**: Uses `isPreviewMode` boolean state

### Styling

- **Builder Mode**: Full editing interface with sidebars
- **Preview Mode**: Centered, clean layout focused on content
- **Responsive**: Works on desktop and mobile devices

## Example Use Cases

1. **Product Catalogs**: Display product information with dynamic pricing
2. **Reports**: Generate summary reports with calculated fields
3. **Dashboards**: Show key metrics and KPIs
4. **Landing Pages**: Create marketing pages with dynamic content

## Next Steps

The static renderer provides a solid foundation for:

- Exporting pages as static HTML
- Generating PDF reports
- Creating shareable preview links
- Building a full CMS system

---

**Ready to build?** Start by loading the sample dataset and switching to Preview Mode to see your product summary page in action!
