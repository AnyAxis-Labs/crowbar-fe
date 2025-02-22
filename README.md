# Crowbar DApp

A decentralized application for creating and trading tokens on Sonic.

## 🚀 Features

- Create new tokens with customizable parameters
- Automated tax management system
- Fair launch mechanism with no presale or team allocation
- Real-time token analytics and tracking
- Integrated Web3 wallet support
- Token staking functionality
- Advanced charting capabilities

## 🛠 Tech Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Web3 Integration**:
  - Wagmi
  - Web3Modal
  - Viem
- **State Management**: TanStack Query (React Query)
- **Routing**: TanStack Router
- **UI Components**:
  - Radix UI
  - Shadcn/ui
- **Code Quality**:
  - Biome (Linting & Formatting)
  - TypeScript strict mode

## 📦 Installation

1. Clone the repository:

```bash
git clone git@anyax.is:AnyAxis-Labs/tax-farm.git
```

2. Install dependencies:

```bash
npm install
```

3. Create environment files:

```bash
cp env/.env.example env/.env.local
```

4. Start the development server:

```bash
npm run dev
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run build:prod` - Build for production
- `npm run lint` - Run Biome linter
- `npm run preview` - Preview production build
- `npm run generate:api` - Generate API client code
- `npm run generate:icons` - Generate icon components
- `npm run update:sc` - Update smart contracts

## 🌐 Environment Setup

The application uses different environments for development and production. Configure the following in your env files:

- API endpoints
- Web3 configuration
- Chain configurations
- Feature flags

## 🔒 Smart Contract Integration

The project integrates with various smart contracts for token creation and management. Smart contract ABIs are automatically updated using the `update:sc` script.

## 🎨 UI Components

The project uses a combination of custom components and Radix UI primitives, styled with TailwindCSS. The component library includes:

- Modals
- Forms
- Charts
- Token creation wizard
- Analytics dashboards

## 📈 Features in Detail

### Token Creation

- Fair launch mechanism
- Optimized contract deployment
- Automated liquidity management
- Customizable tax parameters

### Trading Features

- Real-time price charts
- Order management
- Wallet integration
- Transaction history

### Analytics

- Token performance metrics
- Trading volume analytics
- User statistics
- Revenue tracking

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## 📄 License

Proprietary - All Rights Reserved
