# 💰 Personal Expense Tracker

A modern, mobile-first expense tracking application built with Next.js. Track your income and expenses, visualize spending patterns, and manage your finances - all running locally in your browser with zero backend required.

## ✨ Features

### 🎯 Core Functionality
- **Transaction Management**: Add, edit, and delete transactions with ease
- **Category System**: Organize expenses with color-coded categories
- **Smart Search**: Filter transactions by notes or category
- **CSV Import/Export**: Import existing data and export for backup (with automatic deduplication)
- **VND Currency**: Full Vietnamese Dong support with proper formatting

### 📊 Visualizations
- **Balance Overview**: See your current balance at a glance
- **Top Categories Chart**: Visual bar chart of your biggest expense categories
- **Monthly Aggregations**: Track spending trends by month
- **Category Breakdown**: Color-coded spending by category
- **Recent Transactions**: Quick view of latest activity

### 💾 Data Management
- **Local Storage**: All data stored in browser (localStorage/IndexedDB fallback)
- **No Backend Required**: 100% static, client-side application
- **Privacy First**: Your data never leaves your device
- **CSV Deduplication**: Smart import prevents duplicate entries

### 📱 User Experience
- **Mobile-First Design**: Optimized for mobile devices
- **Responsive Layout**: Works on all screen sizes
- **Edit Dialog**: Clean modal interface for editing transactions
- **Color Indicators**: Visual category colors throughout the app
- **Real-time Updates**: Instant balance and stats updates

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data Storage**: localStorage + localForage (IndexedDB)
- **CSV Parsing**: PapaParse
- **Date Handling**: date-fns
- **Testing**: Vitest + Testing Library
- **E2E Testing**: Playwright

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- pnpm (or npm/yarn)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd expense_tracker

# Install dependencies
cd web
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 📖 Usage

### Adding Transactions
1. Navigate to the **Transactions** page
2. Fill in the transaction form (date, amount, type, category, notes)
3. Click **Save** to add the transaction

### Editing Transactions
1. Click the **Edit** button on any transaction
2. Modify the details in the dialog
3. Click **Save** to update

### Managing Categories
1. Use the **Categories** sidebar on the Transactions page
2. Add new categories with the input field
3. Delete categories with the Delete button

### Importing Data
1. Prepare a CSV file with columns: `id,date,amount,type,category,notes`
2. Click **Import CSV** on the Transactions page
3. Review the preview (shows unique/skipped rows)
4. Click **Import** to add unique transactions

### Exporting Data
1. Click **Export CSV** to download all transactions
2. File is saved as `transactions.csv`

## 📁 Project Structure

```
expense_tracker/
├── specs/                    # Specification documents
│   └── 001-personal-expense/
│       ├── spec.md          # Feature specification
│       ├── plan.md          # Implementation plan
│       └── tasks.md         # Task breakdown
└── web/                     # Next.js application
    ├── src/
    │   ├── app/             # Next.js App Router pages
    │   │   ├── page.tsx            # Home page with visualizations
    │   │   ├── transactions/       # Transactions page
    │   │   └── dashboard/          # Dashboard page
    │   ├── components/      # Reusable UI components
    │   │   ├── TransactionForm.tsx
    │   │   ├── TransactionList.tsx
    │   │   ├── EditTransactionDialog.tsx
    │   │   ├── CategoryEditor.tsx
    │   │   ├── Dashboard.tsx
    │   │   ├── FilterBar.tsx
    │   │   ├── ExportButton.tsx
    │   │   └── ImportDialog.tsx
    │   ├── hooks/           # Custom React hooks
    │   │   ├── useTransactions.ts
    │   │   └── useCategories.ts
    │   ├── lib/             # Utility libraries
    │   │   ├── storage.ts        # localStorage adapter
    │   │   ├── csv.ts            # CSV import/export
    │   │   ├── date.ts           # Date utilities
    │   │   └── currency.ts       # VND formatting
    │   ├── types/           # TypeScript type definitions
    │   └── tests/           # Unit and E2E tests
    └── package.json
```

## 🧪 Testing

```bash
# Run unit tests
pnpm test

# Run unit tests in watch mode
pnpm test:watch

# Run E2E tests
pnpm test:e2e

# Type checking
pnpm exec tsc --noEmit
```

## 🏗️ Build & Deploy

### Static Export

```bash
# Build and export static files
pnpm build
pnpm export

# Output directory: out/
```

The exported `out/` folder can be deployed to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- Any CDN or web server

### Development

```bash
# Start dev server
pnpm dev

# Lint code
pnpm lint

# Format code
pnpm format
```

## 🎨 Features Walkthrough

### Home Page
- **Balance Banner**: Large, prominent display of current balance
- **Summary Cards**: Quick view of balance, income, and expenses
- **Top Categories Chart**: Visual bar chart showing top 5 expense categories
- **Recent Transactions**: List of 5 most recent transactions with category colors

### Transactions Page
- **Add Transaction Form**: Quick entry for new transactions
- **Search & Filter**: Find transactions by text search
- **Transaction List**: All transactions with edit/delete actions
- **Category Management**: Add/remove categories in sidebar
- **Import/Export**: CSV data management
- **Quick Stats**: Transaction count, categories, current balance

### Dashboard
- **View Selector**: Switch between Day/Week/Month views
- **Total Display**: Current balance with color coding
- **By Month**: Monthly aggregations sorted by date
- **Category Breakdown**: All categories with totals and color indicators

## 🔐 Privacy & Security

- **No Backend**: All data processing happens in your browser
- **Local Storage**: Data stored only on your device
- **No Analytics**: No tracking or telemetry
- **No Accounts**: No sign-up or authentication required
- **Offline Capable**: Works without internet after initial load

## 📝 Data Format

### Transaction Model
```typescript
{
  id: string           // Unique identifier
  date: string         // ISO date (YYYY-MM-DD)
  amount: number       // Amount in VND
  type: 'expense' | 'income'
  category: string     // Category name
  notes: string        // Optional notes
}
```

### Category Model
```typescript
{
  id: string           // Unique identifier
  name: string         // Category name
  color?: string       // Hex color code (optional)
}
```

## 🤝 Contributing

This is a personal project built for learning and demonstration purposes. Feel free to fork and modify for your own use.

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- Built with Next.js and React
- UI components inspired by modern design patterns
- Vietnamese currency formatting for local market

---

**Note**: This is a static, client-side application. All data is stored locally in your browser. Clear your browser data will delete all transactions.
