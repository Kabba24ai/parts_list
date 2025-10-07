# Equipment Management System

A comprehensive web application for managing parts inventory, equipment, and suppliers for heavy equipment operations.

## Features

### Parts Management
- **Comprehensive Parts Tracking**: Manage parts inventory with detailed information including stock levels, minimum stock thresholds, and DNI (Do Not Inventory) items
- **Multi-Supplier Support**: Track up to 3 alternative suppliers per part with individual part numbers and costs
- **Stock Management**: Quick stock level updates with visual status indicators (In Stock, Buy Now, Out of Stock, DNI)
- **Smart Filtering**: Filter by category, equipment, stock status, or search across parts, suppliers, and equipment
- **Hierarchical Sorting**: Default sort by Category (alphabetical), then Equipment Name, then Part Name

### Template Management
- **Equipment Templates**: Create reusable maintenance templates for equipment categories
- **Batch Part Assignment**: Add multiple parts to templates and manage equipment associations
- **Quick Part Creation**: Create new parts directly from templates with pre-populated template assignments

### Supplier Management
- **Supplier Search Window**: Dedicated search interface for finding parts by supplier
- **Supplier Directory**: Complete contact information including address, phone, contact person, and email
- **Parts by Supplier**: View all parts available from each supplier with full details and stock status

## Project Structure

```
src/
├── App.tsx                    # Main application router and state management
├── PartsManagement.tsx        # Master parts list with filtering and stock management
├── PartDetail.tsx            # Create/Edit part form with supplier management
├── PartView.tsx              # Read-only part details view
├── TemplateManagement.tsx     # Template list and management
├── TemplateDetail.tsx        # Create/Edit template form
├── SupplierSearch.tsx        # Supplier search and parts browser
├── main.tsx                  # Application entry point
└── index.css                 # Global styles with Tailwind CSS
```

## Technology Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3
- **Icons**: Lucide React
- **Database**: Supabase (configured but not yet integrated)

## Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd project
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the project root with your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

Build the application:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

### Code Quality

Run ESLint:
```bash
npm run lint
```

Run TypeScript type checking:
```bash
npm run typecheck
```

## Key Components

### PartsManagement
The main parts list component with:
- Dashboard stats cards (Total, In Stock, Buy Now, Out of Stock, DNI)
- Advanced filtering (search, category, equipment, stock status)
- Quick actions (View, Edit, Delete)
- Stock level updates via modal
- Supplier Search integration

### PartDetail
Form component for creating/editing parts with:
- Basic part information (name, description, stock levels)
- Template/list assignment
- DNI and General Supply Item flags
- Up to 3 supplier configurations with part numbers and costs
- Real-time supplier detail display
- Equipment list for assigned templates

### SupplierSearch
Dedicated supplier search window with:
- Two-panel layout (suppliers list and parts details)
- Supplier contact information display
- Parts filtered by selected supplier
- Stock status indicators
- Part cost and inventory information

### TemplateManagement
Template management interface with:
- Template categories and equipment assignments
- Parts count per template
- Quick template creation and editing
- Template-based part creation

## Data Models

### Part
```typescript
{
  id: number
  part_name: string
  category: string
  equipment_name: string
  equipment_id: string
  part_number: string
  supplier: string
  unit_cost: number
  stock_level: number
  min_stock: number
  dni: boolean
  description?: string
  general_supply_item?: boolean
}
```

### Supplier
```typescript
{
  name: string
  address: string
  phone: string
  contact: string
  email: string
}
```

### Template
```typescript
{
  id: number
  name: string
  category: string
  equipment: Array<{
    name: string
    id: string
    category: string
  }>
  parts_count: number
}
```

## Categories

The system supports the following equipment categories:
- Bulldozers
- Compressors
- Excavators
- Generators
- Loaders
- Supplies (General Use)

## Stock Status Logic

Parts are automatically categorized based on inventory levels:
- **In Stock**: Current stock ≥ minimum stock
- **Buy Now**: Current stock < minimum stock (but > 0)
- **Out of Stock**: Current stock = 0 (not DNI)
- **DNI**: Do Not Inventory items (ordered as needed)

## UI/UX Features

### Design Principles
- Clean, professional interface with blue and gray color scheme
- Responsive design optimized for desktop workflows
- Consistent spacing using 8px grid system
- Clear visual hierarchy with proper typography
- Accessible color contrast ratios

### Interactive Elements
- Hover states on all interactive elements
- Smooth transitions and animations
- Modal dialogs for focused tasks
- Badge indicators for status
- Icon-based actions for quick access

### User Feedback
- Real-time validation on forms
- Clear error messages
- Success confirmations
- Loading states for async operations
- Empty states with helpful guidance

## Future Development

### Database Integration
The application is configured for Supabase but currently uses mock data. Next steps:

1. **Schema Design**: Create database tables for parts, suppliers, templates, and equipment
2. **Authentication**: Implement user authentication and role-based access
3. **API Integration**: Replace mock data with Supabase queries
4. **Real-time Updates**: Leverage Supabase real-time features for multi-user scenarios
5. **File Storage**: Add support for part images and documents

### Planned Features
- Purchase order generation
- Inventory transaction history
- Low stock alerts and notifications
- Supplier performance tracking
- Advanced reporting and analytics
- Barcode/QR code scanning
- Mobile-responsive views
- Export to Excel/PDF
- Bulk import/export functionality

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Contributing

1. Follow the existing code style and patterns
2. Use TypeScript for type safety
3. Maintain component separation of concerns
4. Write descriptive commit messages
5. Test all features before committing

## License

[Add your license information here]

## Contact

[Add contact information for the development team]
