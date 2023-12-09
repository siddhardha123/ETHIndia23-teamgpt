import { useEffect, useState } from 'react'
import {
  VStack,
  Input,
  Button,
  Flex,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Heading,
  HStack,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@chakra-ui/react'
import { useAccount } from 'wagmi'
import { ToastContainer, toast } from 'react-toastify'
import Papa from 'papaparse'

const Fields = {
  NO_OF_TXNS: 'no_of_transactions',
  NO_OF_NFTS: 'no_of_nfts',
  WALLET_BALANCE: 'wallet_balance',
  GITHUB_FOLLOWERS: 'github_followers',
  GITHUB_PUBLIC_REPOS: 'github_public_repos',
}

const DashboardPage = () => {
  const [fields, setFields] = useState([{ option: '', value: '' }])
  const [usedOptions, setUsedOptions] = useState(new Set())
  const [walletId, setWalletId] = useState(null)
  const { address } = useAccount()

  useEffect(() => {
    fetch(`http://localhost:3001/api/orgs/id/${address}`)
      .then((response) => response.json())
      .then((data) => {
        setWalletId(data.id)
      })
      .catch((error) => console.error('Error fetching wallet ID:', error))
  }, [])

  const handleAddRow = () => {
    setFields([...fields, { option: '', value: '' }])
  }

  const handleRemoveRow = (index) => {
    const updatedFields = [...fields]
    const removedField = updatedFields.splice(index, 1)[0]
    setFields(updatedFields)
    setUsedOptions(
      (prev) => new Set([...prev].filter((x) => x !== removedField.option))
    )
  }

  const handleFieldChange = (index, field, value) => {
    const updatedFields = [...fields]
    if (field === 'option') {
      setUsedOptions((prev) => new Set(prev.add(value)))
    }
    updatedFields[index][field] = value
    setFields(updatedFields)
  }

  const handleSubmit = () => {
    const rules = fields.reduce((acc, field) => {
      acc[Fields[field.option.toUpperCase().split(' ').join('_')]] = field.value
      return acc
    }, {})

    if (walletId) {
      fetch(`http://localhost:3001/api/orgs/${walletId}/rules`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rules }),
      })
        .then((response) => response.json())
        .then((data) =>
          toast.success(`${data.message}`, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
          })
        )
        .catch((error) => console.error('Error:', error))
    } else {
      console.error('Wallet ID not available')
    }
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const filteredData = results.data.filter(
          (row) => row.wallet_address && row.github_username
        )

        const formattedData = filteredData.map((row) => ({
          wallet_address: row.wallet_address,
          github_username: row.github_username,
        }))

        sendPostRequest({ userData: formattedData })
      },
    })
  }

  const sendPostRequest = (data) => {
    console.log('id', walletId)
    fetch(`http://localhost:3001/api/orgs/${walletId}/dump`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error('Error:', error))
  }

  const data = [
    {
      wallet_balance: '0.808680858499567549',
      no_of_nfts: '3',
      no_of_transactions: '54',
      github_username: 'Abbigail73',
      github_public_repos: '2',
      github_followers: '6',
      xp: 5240.251963077197,
      level: 4,
    },
    {
      wallet_balance: '0.0',
      no_of_nfts: '0',
      no_of_transactions: '0',
      github_username: 'Roosevelt_Koss8',
      github_public_repos: '7',
      github_followers: '7',
      xp: 0,
      level: 0,
    },
    {
      wallet_balance: '0.0',
      no_of_nfts: '446',
      no_of_transactions: '2454',
      github_username: 'Jessica39',
      github_public_repos: '3',
      github_followers: '9',
      xp: 0,
      level: 0,
    },
    {
      wallet_balance: '0.0',
      no_of_nfts: '1964',
      no_of_transactions: '4317',
      github_username: 'Mercedes.Mayer',
      github_public_repos: '3',
      github_followers: '7',
      xp: 0,
      level: 0,
    },
    {
      wallet_balance: '0.0',
      no_of_nfts: '0',
      no_of_transactions: '0',
      github_username: 'Oceane15',
      github_public_repos: '2',
      github_followers: '4',
      xp: 0,
      level: 0,
    },
    {
      wallet_balance: '0.0',
      no_of_nfts: '0',
      no_of_transactions: '0',
      github_username: 'Vincent.Crooks93',
      github_public_repos: '3',
      github_followers: '1',
      xp: 0,
      level: 0,
    },
    {
      wallet_balance: '0.0',
      no_of_nfts: '0',
      no_of_transactions: '0',
      github_username: 'Kianna_Gleichner83',
      github_public_repos: '9',
      github_followers: '2',
      xp: 0,
      level: 0,
    },
    {
      wallet_balance: '0.0',
      no_of_nfts: '0',
      no_of_transactions: '0',
      github_username: 'Ansel50',
      github_public_repos: '8',
      github_followers: '3',
      xp: 0,
      level: 0,
    },
    {
      wallet_balance: '0.0',
      no_of_nfts: '0',
      no_of_transactions: '0',
      github_username: 'Corene.Lehner28',
      github_public_repos: '9',
      github_followers: '3',
      xp: 0,
      level: 0,
    },
    {
      wallet_balance: '0.0',
      no_of_nfts: '0',
      no_of_transactions: '0',
      github_username: 'Maribel.Raynor93',
      github_public_repos: '4',
      github_followers: '8',
      xp: 0,
      level: 0,
    },
  ]

  const DataTable = () => (
    <Table variant='simple' colorScheme='teal'>
      <Thead>
        <Tr>
          <Th>Wallet Balance</Th>
          <Th>No. of NFTs</Th>
          <Th>No. of Transactions</Th>
          <Th>Github Username</Th>
          <Th>Github Public Repos</Th>
          <Th>Github Followers</Th>
          <Th>XP</Th>
          <Th>Level</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map((item, index) => (
          <Tr key={index}>
            <Td color='white'>{parseFloat(item.wallet_balance).toFixed(2)}</Td>
            <Td color='white'>{item.no_of_nfts}</Td>
            <Td color='white'>{item.no_of_transactions}</Td>
            <Td color='white'>{item.github_username}</Td>
            <Td color='white'>{item.github_public_repos}</Td>
            <Td color='white'>{item.github_followers}</Td>
            <Td color='white'>{item.xp}</Td>
            <Td color='white'>{item.level}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )


  return (
    <VStack spacing={4} alignItems='stretch'>
      <ToastContainer />
      <Heading
        mb={6}
        fontSize={{ base: 'xl', md: '2xl', lg: '4xl' }}
        fontWeight='bold'
        lineHeight='none'
        textAlign='center'
        letterSpacing={{ base: 'normal', md: 'tight' }}
        color='gray.600'
        _dark={{
          color: 'gray.100',
        }}
      >
        - Input how much XP you want to equate for one unit of the action -
      </Heading>
      <Text fontSize={18} color='white'>
        Example: 1 Unit of Action = X Score
      </Text>

      {fields.map((field, index) => (
        <Flex key={index} alignItems='center'>
          <Menu>
            <MenuButton as={Button}>{field.option || 'Actions'}</MenuButton>
            <MenuList>
              {Object.keys(Fields)
                .filter((f) => !usedOptions.has(f))
                .map((key) => (
                  <MenuItem
                    key={key}
                    onClick={() => handleFieldChange(index, 'option', key)}
                  >
                    {key.replace(/_/g, ' ').toLowerCase()}
                  </MenuItem>
                ))}
            </MenuList>
          </Menu>
          <Spacer />
          <Input
            type='number'
            flex='2'
            style={{ color: 'white' }}
            value={field.value}
            onChange={(e) => handleFieldChange(index, 'value', e.target.value)}
          />
          <Spacer />
          <Button onClick={() => handleRemoveRow(index)}>Remove</Button>
        </Flex>
      ))}
      <VStack mt='50px'>
        <Button maxW='150px' onClick={handleAddRow}>
          Add Another Rule
        </Button>
        <HStack>
          <Button as='label'>Upload CSV</Button>
          <input type='file' accept='.csv' onChange={handleFileUpload} />
        </HStack>
        {/* Add table below */}
        <DataTable />
        <Button maxW='10vw' onClick={handleSubmit}>
          Submit
        </Button>
      </VStack>
    </VStack>
  )
}

export default DashboardPage
