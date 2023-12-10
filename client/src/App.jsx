import { ChakraProvider, VStack } from '@chakra-ui/react'
import Navbar from './components/Navbar'
import '@rainbow-me/rainbowkit/styles.css'
import {
    connectorsForWallets,
    getDefaultWallets,
    RainbowKitProvider,
    darkTheme
} from '@rainbow-me/rainbowkit'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { mainnet, polygon, optimism, arbitrum, base, zora } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import {
    argentWallet,
    ledgerWallet,
    trustWallet,
} from '@rainbow-me/rainbowkit/wallets'
import { LandingHero } from './components/LandingHero'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Collection from './components/Collection'

const { chains, publicClient } = configureChains(
    [mainnet, polygon, optimism, arbitrum, base, zora],
    [
        alchemyProvider({ apiKey: 'f3xicYBOhro15VSMDun6KO0zysLe9sdR' }),
        publicProvider(),
    ]
)

const projectId = '17dd157202ff60d13ea968c48fe8b988'

const { wallets } = getDefaultWallets({
    appName: 'My RainbowKit App',
    projectId,
    chains,
})

const connectors = connectorsForWallets([
    ...wallets,
    {
        groupName: 'Other',
        wallets: [
            argentWallet({ projectId, chains }),
            trustWallet({ projectId, chains }),
            ledgerWallet({ projectId, chains }),
        ],
    },
])

const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
})

function App() {
    return (
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains} theme={darkTheme()}>
          <ChakraProvider>
            <ToastContainer />
            <VStack
              minHeight='100vh'
              width='100vw'
              display='flex'
              justifyContent='center'
              backgroundColor='black'
            >
              <Navbar />
              <Router>
                <Routes>
                  <Route path='/' element={<LandingHero />} />
                  <Route path='/dashboard' element={<Dashboard />} />
                  <Route path='/collection' element={<Collection />} />
                </Routes>
              </Router>
            </VStack>
          </ChakraProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    )
}

export default App
