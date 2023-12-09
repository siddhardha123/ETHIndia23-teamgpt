import { useEffect, useState } from 'react'
import {
  VStack,
  Heading,
  Input,
  Button,
  Flex,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import { useAccount } from 'wagmi'

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
    fetch(
      `http://localhost:3001/api/orgs/id/${address}`
    )
      .then((response) => response.json())
      .then((data) => setWalletId(data.wallet_id))
      .catch((error) => console.error('Error fetching wallet ID:', error))

      console.log("www", walletId)
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

//   const handleSubmit = () => {
//     const rules = fields.reduce((acc, field) => {
//       acc[Fields[field.option.toUpperCase().split(' ').join('_')]] = field.value
//       return acc
//     }, {})
//     console.log({ rules })
//   }

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
        .then((data) => console.log('Success:', data))
        .catch((error) => console.error('Error:', error))
    } else {
      console.error('Wallet ID not available')
    }
  }


  return (
    <VStack spacing={4} alignItems='stretch'>
      <Heading size='lg' color='white'>
        Dashboard
      </Heading>
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
            value={field.value}
            onChange={(e) => handleFieldChange(index, 'value', e.target.value)}
          />
          <Spacer />
          <Button onClick={() => handleRemoveRow(index)}>Remove</Button>
        </Flex>
      ))}
      <Button onClick={handleAddRow}>Add Another Rule</Button>
      <Button onClick={handleSubmit}>Submit</Button>
    </VStack>
  )
}

export default DashboardPage
