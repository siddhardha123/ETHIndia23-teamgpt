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
} from '@chakra-ui/react'
import { useAccount } from 'wagmi'
import { ToastContainer, toast } from 'react-toastify'

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
        <Button maxW='10vw' onClick={handleAddRow}>
          Add Another Rule
        </Button>
        <Button maxW='10vw' onClick={handleSubmit}>
          Submit
        </Button>
      </VStack>
    </VStack>
  )
}

export default DashboardPage
