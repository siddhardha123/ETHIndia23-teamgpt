import { useEffect, useState } from 'react'
import { VStack, Input, HStack, Text, Box, Button } from '@chakra-ui/react'
import { useAccount } from 'wagmi'
import { ToastContainer, toast } from 'react-toastify'
import Papa from 'papaparse'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Checkbox,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  RadioGroup,
  Radio,
  Stack,
} from '@chakra-ui/react'

const Fields = {
  NO_OF_TXNS: 'no_of_transactions',
  NO_OF_NFTS: 'no_of_nfts',
  WALLET_BALANCE: 'wallet_balance',
  GITHUB_FOLLOWERS: 'github_followers',
  GITHUB_PUBLIC_REPOS: 'github_public_repos',
}

const FilterModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent backgroundColor='gray.800' color='white'>
        <ModalHeader>Add Filters</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* Add your filter fields here */}
          {/* Example of one filter field */}
          <Stack spacing={4} mb='10px'>
            <Checkbox>Number of Transactions</Checkbox>
            <RadioGroup defaultValue='greater_than'>
              <Stack spacing={5} direction='row'>
                <Radio value='less_than'>Less than</Radio>
                <Radio value='greater_than'>Greater than</Radio>
              </Stack>
            </RadioGroup>
            <NumberInput defaultValue={2} min={0}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Stack>
          <Stack spacing={4} mb='10px'>
            <Checkbox>NFTs Owned</Checkbox>
            <RadioGroup defaultValue='greater_than'>
              <Stack spacing={5} direction='row'>
                <Radio value='less_than'>Less than</Radio>
                <Radio value='greater_than'>Greater than</Radio>
              </Stack>
            </RadioGroup>
            <NumberInput defaultValue={2} min={0}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Stack>
          <Stack spacing={4} mb='10px'>
            <Checkbox>Domains Owned</Checkbox>
            <RadioGroup defaultValue='greater_than'>
              <Stack spacing={5} direction='row'>
                <Radio value='less_than'>Less than</Radio>
                <Radio value='greater_than'>Greater than</Radio>
              </Stack>
            </RadioGroup>
            <NumberInput defaultValue={2} min={0}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Stack>
          <Stack spacing={4} mb='10px'>
            <Checkbox>Token Holdings</Checkbox>
            <RadioGroup defaultValue='greater_than'>
              <Stack spacing={5} direction='row'>
                <Radio value='less_than'>Less than</Radio>
                <Radio value='greater_than'>Greater than</Radio>
              </Stack>
            </RadioGroup>
            <NumberInput defaultValue={2} min={0}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Stack>
          {/* Repeat the above for each filter field */}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Close
          </Button>
          <Button onClick={onClose}>Calculate</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

const DashboardPage = () => {
  const [fields, setFields] = useState([{ option: '', value: '' }])
  const [usedOptions, setUsedOptions] = useState(new Set())
  const [walletId, setWalletId] = useState(null)
  const { address } = useAccount()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleSubmit = () => {
    setShowSpinner(true)
    randomizeAddresses()

    setTimeout(() => {
      setShowSpinner(false)
    }, 3000)
  }

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

//   const handleSubmit = () => {
//     const rules = fields.reduce((acc, field) => {
//       acc[Fields[field.option.toUpperCase().split(' ').join('_')]] = field.value
//       return acc
//     }, {})

//     if (walletId) {
//       fetch(`http://localhost:3001/api/orgs/${walletId}/rules`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ rules }),
//       })
//         .then((response) => response.json())
//         .then((data) =>
//           toast.success(`${data.message}`, {
//             position: 'top-right',
//             autoClose: 5000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//             theme: 'dark',
//           })
//         )
//         .catch((error) => console.error('Error:', error))
//     } else {
//       console.error('Wallet ID not available')
//     }
//   }

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

  const addresses = [
    '0x82E5679071DDD33ede88F9BCBC9C23a01bC9dc91',
    '0x09EA01592ACDA28657e51097eBC10ec836Ee3D25',
    '0x90F79bf6EB2c4f870365E785982E1f101E93b906',
    '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
    '0x07A7f58520C4AdC4Daf5c1612227Ab072A9a7309',
    '0x8319355559482816Cf35aDCBaA7D6A0424630f44',
    '0x2FBeBD38Fd059c93147e0A04d4B696E65940fEca',
    '0xc960c864652359779F4Cb740b10fC39636946D89',
    '0x4BdF93F9ADaCF46D6B1e6319712FbA4f8e20d315',
    '0x6ac61422CF9770981838A8984402e3776CBBc204',
  ]

  return (
    <div>
      <VStack spacing={4} alignItems='stretch' mt='100px'>
        <ToastContainer />
        <Box
          w='70vw'
          h='70px'
          display='flex'
          justifyContent='space-between'
          p='20px'
          alignItems='center'
          style={{
            background: 'rgba(255, 255, 255, 0.06)',
            borderRadius: '50px',
          }}
          cursor={!address && 'not-allowed'}
          opacity={!address && '15%'}
        >
          <Box
            w='250px'
            h='50px'
            display='flex'
            justifyContent='center'
            alignItems='center'
            cursor={address && 'pointer'}
          >
            <label
              htmlFor='file-upload'
              style={{
                cursor: `${address && 'pointer'}`,
                border: '1px solid red',
                borderRadius: '50px',
                padding: '10px',
              }}
            >
              <Text fontSize='20px' color='red'>
                Remove file X
              </Text>
            </label>
            <input
              id='file-upload'
              type='file'
              accept='.csv'
              disabled={!address}
              style={{ display: 'none' }}
              onChange={handleFileUpload}
            />
          </Box>
          <Input
            border='none'
            focusBorderColor='none'
            color='white'
            backgroundColor='rgba(255, 255, 255, 0.06)'
            mr='10px'
          />
          <Box
            w='150px'
            h='50px'
            style={{
              backgroundColor: '#8575FF',
              borderRadius: '50px',
            }}
            display='flex'
            justifyContent='center'
            alignItems='center'
            cursor={address && 'pointer'}
          >
            <Text color='white'>Query</Text>
          </Box>
        </Box>
        <Text color='white'>Suggestions</Text>
        <HStack>
          <Box
            style={{
              borderRadius: '200px',
              border: '1px solid #545454',
              color: 'white',
              padding: '8px',
              fontSize: '12px',
              cursor: 'pointer',
            }}
          >
            Holders of Axie Infinity
          </Box>
          <Box
            style={{
              borderRadius: '200px',
              border: '1px solid #545454',
              color: 'white',
              padding: '8px',
              fontSize: '12px',
              cursor: 'pointer',
            }}
          >
            Holders of CryptoPunks
          </Box>
        </HStack>
        <HStack mt='50px'>
          <VStack>
            <Text color='white'>Community Stats</Text>
            <Box
              maxW='xs'
              overflow='hidden'
              p={6}
              bg='gray.700'
              background='rgba(255, 255, 255, 0.06)'
              color='white'
              borderRadius='30px'
            >
              <VStack
                spacing={4}
                align='flex-start'
                display='flex'
                justifyContent='center'
              >
                <Text fontSize='24px' fontWeight='bold'>
                  Market Cap
                </Text>
                <Text fontSize='16px'>23.5</Text>
              </VStack>
            </Box>
            <Box
              maxW='xs'
              overflow='hidden'
              p={6}
              bg='gray.700'
              background='rgba(255, 255, 255, 0.06)'
              color='white'
              borderRadius='30px'
            >
              <VStack
                spacing={4}
                align='flex-start'
                display='flex'
                justifyContent='center'
              >
                <Text fontSize='24px' fontWeight='bold'>
                  Total Trxns
                </Text>
                <Text fontSize='16px'>23.2k</Text>
              </VStack>
            </Box>
            <Box
              maxW='xs'
              overflow='hidden'
              p={6}
              bg='gray.700'
              background='rgba(255, 255, 255, 0.06)'
              color='white'
              borderRadius='30px'
            >
              <VStack
                spacing={4}
                align='flex-start'
                display='flex'
                justifyContent='center'
              >
                <Text fontSize='24px' fontWeight='bold'>
                  ENS Owned{' '}
                </Text>
                <Text fontSize='16px'>23.2k</Text>
              </VStack>
            </Box>
          </VStack>
          <VStack>
            <Text color='black'>-</Text>
            <Box
              maxW='xs'
              overflow='hidden'
              p={6}
              bg='gray.700'
              background='rgba(255, 255, 255, 0.06)'
              color='white'
              borderRadius='30px'
            >
              <VStack
                spacing={4}
                align='flex-start'
                display='flex'
                justifyContent='center'
              >
                <Text fontSize='24px' fontWeight='bold'>
                  Wallet Balance{' '}
                </Text>
                <Text fontSize='16px'>23.5</Text>
              </VStack>
            </Box>
            <Box
              maxW='xs'
              overflow='hidden'
              p={6}
              bg='gray.700'
              background='rgba(255, 255, 255, 0.06)'
              color='white'
              borderRadius='30px'
            >
              <VStack
                spacing={4}
                align='flex-start'
                display='flex'
                justifyContent='center'
              >
                <Text fontSize='24px' fontWeight='bold'>
                  No of NFTs{' '}
                </Text>
                <Text fontSize='16px'>23.5</Text>
              </VStack>
            </Box>
            <Box
              maxW='xs'
              overflow='hidden'
              p={6}
              bg='gray.700'
              background='rgba(255, 255, 255, 0.06)'
              color='white'
              borderRadius='30px'
            >
              <VStack
                spacing={4}
                align='flex-start'
                display='flex'
                justifyContent='center'
              >
                <Text fontSize='24px' fontWeight='bold'>
                  XMTP Owned{' '}
                </Text>
                <Text fontSize='16px'>23.5</Text>
              </VStack>
            </Box>
          </VStack>
          <VStack ml='10px'>
            <Text color='black'>Total wallets - 125</Text>
            <Box
              w='650px'
              h='500px'
              overflow='hidden'
              p={6}
              bg='gray.700'
              background='rgba(255, 255, 255, 0.06)'
              color='white'
              borderRadius='30px'
            >
              <VStack
                spacing={4}
                align='flex-start'
                display='flex'
                justifyContent='center'
              >
                <Text fontSize='24px' fontWeight='bold'>
                  Wallets
                </Text>
                {addresses.map((address) => (
                  <Text key={address}>
                    {`${address.slice(0, 7)}...${address.slice(-7)}`}
                  </Text>
                ))}
              </VStack>
            </Box>
          </VStack>
        </HStack>
        <Button
          width='377px'
          height='60px'
          style={{ borderRadius: '25px', background: '#212121' }}
          color='white'
          mt='-30px'
          onClick={onOpen} // Add this line to your Add Filters button
        >
          Add Filters
        </Button>
        <FilterModal isOpen={isOpen} onClose={onClose} />
        <Button
          width='full'
          style={{ borderRadius: '200px', background: '#8575FF' }}
          color='white'
          mb='50px'
          onClick={() => window.open('/collection')}
        >
          Proceed with Airdrop
        </Button>
      </VStack>
    </div>
  )
}

export default DashboardPage
