import { useState } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'

function Collection() {
  const [showModal, setShowModal] = useState(false)
  const [imageUrl, setImageUrl] = useState(
    'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGljfGVufDB8fDB8fHww'
  )
  const [collectionName, setCollectionName] = useState('test')
  const [collectionDescription, setCollectionDescription] = useState('test')
  const [chain, setChain] = useState('polygon')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [modalValue, setModalValue] = useState(0)

  const toggleModal = () => setShowModal(!showModal)

  const handleDeploy = async (event) => {
    event.preventDefault()

    const bodyData = {
      chain: chain,
      name: collectionName,
      imageUrl: imageUrl,
      description: collectionDescription,
      collectionId: 'testtt',
    }

    try {
      const response = await axios.post(
        'https://staging-jade.vercel.app/api/create_collection',
        bodyData
      )

      console.log('NFT collection created successfully:', response.data)
    } catch (error) {
      console.error('There was an error creating the collection: ', error)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    // Add logic to handle the submit
  }

  return (
    <>
      <button className='btn btn-primary' onClick={onOpen}>
        Create a collection
      </button>

      <Modal isOpen={isOpen} onClose={onClose} size='xl'>
        <ModalOverlay />
        {modalValue === 0 ? (
          <ModalContent backgroundColor='#212121' color='white'>
            <HStack
              display='flex'
              justifyContent='space-evenly'
              alignItems='center'
              mt='20px'
              mb='20px'
              w='60%'
            >
              <Text cursor='pointer'> 1. Create a collection</Text>
              <Text
                cursor='pointer'
                color='#6A6A6A'
                onClick={() => setModalValue(1)}
              >
                2. Airdrop NFTs
              </Text>
            </HStack>
            <Text color='#6A6A6A' ml='30px'>
              Start by creating an NFT collection.
            </Text>

            <ModalCloseButton />
            <ModalBody pb={6}>
              <HStack
                display='flex'
                justifyContent='space-between'
                alignItems='center'
              >
                <VStack>
                  <Box
                    border='1px dashed #454545'
                    height='320px'
                    width='240px'
                    borderRadius='10px'
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    cursor='pointer'
                  >
                    <Text fontSize='60px' color='gray' fontWeight={100}>
                      +
                    </Text>
                  </Box>
                </VStack>
                <VStack>
                  <FormControl>
                    <FormLabel color='#6A6A6A'>
                      Collection Name (32 chars)
                    </FormLabel>
                    <Input
                      placeholder='Enter collection name'
                      maxLength={32}
                      value={collectionName}
                      border='none'
                      borderRadius='15px'
                      backgroundColor='#2B2B2B'
                      onChange={(e) => setCollectionName(e.target.value)}
                    />
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel color='#6A6A6A'>
                      Collection Description
                    </FormLabel>
                    <Input
                      placeholder='Enter collection description'
                      value={collectionDescription}
                      border='none'
                      borderRadius='15px'
                      backgroundColor='#2B2B2B'
                      onChange={(e) => setCollectionDescription(e.target.value)}
                    />
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel color='#6A6A6A'>Choose chain</FormLabel>
                    <RadioGroup onChange={setChain} value={chain}>
                      <Stack direction='row' gap={5}>
                        <Radio value='polygon'>Polygon</Radio>
                        <Radio value='base'>Base</Radio>
                        <Radio value='arbitrum'>Arbitrum</Radio>
                      </Stack>
                    </RadioGroup>
                  </FormControl>
                </VStack>
              </HStack>
            </ModalBody>

            <ModalFooter>
              <Button
                width='full'
                style={{ borderRadius: '200px', background: '#8575FF' }}
                color='white'
                onClick={handleSubmit}
              >
                Deploy Collection
              </Button>
            </ModalFooter>
          </ModalContent>
        ) : (
          <ModalContent backgroundColor='#212121' color='white'>
            <HStack
              display='flex'
              justifyContent='space-evenly'
              alignItems='center'
              mt='20px'
              mb='20px'
              w='60%'
            >
              <Text
                cursor='pointer'
                onClick={() => setModalValue(0)}
                color='#6A6A6A'
              >
                1. Create a collection
              </Text>
              <Text cursor='pointer'> 2. Airdrop NFTs</Text>
            </HStack>
            <Text color='#6A6A6A' ml='30px'>
              Your collection is deployed! Add details of your NFT to airdrop
              them to the wallets.
            </Text>

            <ModalCloseButton />
            <ModalBody pb={6}>
              <HStack
                display='flex'
                justifyContent='space-between'
                alignItems='center'
              >
                <VStack>
                  <Box
                    border='1px dashed #454545'
                    height='320px'
                    width='240px'
                    borderRadius='10px'
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    cursor='pointer'
                  >
                    <Text fontSize='60px' color='gray' fontWeight={100}>
                      +
                    </Text>
                  </Box>
                </VStack>
                <VStack>
                  <FormControl>
                    <FormLabel color='#6A6A6A'>
                      Collection Name (32 chars)
                    </FormLabel>
                    <Input
                      placeholder='Enter collection name'
                      maxLength={32}
                      value={collectionName}
                      border='none'
                      borderRadius='15px'
                      backgroundColor='#2B2B2B'
                      onChange={(e) => setCollectionName(e.target.value)}
                    />
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel color='#6A6A6A'>
                      Collection Description
                    </FormLabel>
                    <Input
                      placeholder='Enter collection description'
                      value={collectionDescription}
                      border='none'
                      borderRadius='15px'
                      backgroundColor='#2B2B2B'
                      onChange={(e) => setCollectionDescription(e.target.value)}
                    />
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel color='#6A6A6A'>Traits</FormLabel>
                    <HStack>
                      <Input
                        placeholder='Key'
                        // value={'Key'}
                        border='none'
                        borderRadius='15px'
                        backgroundColor='#2B2B2B'
                        onChange={(e) =>
                          setCollectionDescription(e.target.value)
                        }
                      />
                      <Input
                        placeholder='Value'
                        // value={'Value'}
                        border='none'
                        borderRadius='15px'
                        backgroundColor='#2B2B2B'
                        onChange={(e) =>
                          setCollectionDescription(e.target.value)
                        }
                      />
                    </HStack>
                  </FormControl>
                </VStack>
              </HStack>
            </ModalBody>

            <ModalFooter>
              <Button
                width='full'
                style={{ borderRadius: '200px', background: '#8575FF' }}
                color='white'
                onClick={handleSubmit}
              >
                Mint
              </Button>
            </ModalFooter>
          </ModalContent>
        )}
      </Modal>

      {/* {showModal ? (
        <div className='modal show d-block' tabIndex='-1'>
          <div className='modal-dialog modal-dialog-centered'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'>Step 1. Create a collection</h5>
                <button
                  type='button'
                  className='btn-close'
                  onClick={toggleModal}
                ></button>
              </div>
              <div className='modal-body'>
                <form onSubmit={handleDeploy}>
                  <p className='mt-2'>
                    Start by creating an NFT collection for your airdrop.
                  </p>
                  <div className='mb-3'>
                    <label htmlFor='image-url' className='form-label'>
                      Image Url
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      id='image-url'
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                    />
                  </div>
                  <div className='mb-3'>
                    <label htmlFor='collection-name' className='form-label'>
                      Collection Name (32 chars)
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      id='collection-name'
                      maxLength='32'
                      value={collectionName}
                      onChange={(e) => setCollectionName(e.target.value)}
                    />
                  </div>
                  <div className='mb-3'>
                    <label
                      htmlFor='collection-description'
                      className='form-label'
                    >
                      Collection Description
                    </label>
                    <textarea
                      className='form-control'
                      id='collection-description'
                      rows='3'
                      value={collectionDescription}
                      onChange={(e) => setCollectionDescription(e.target.value)}
                    ></textarea>
                  </div>
                  <div className='mb-3'>
                    <label className='form-label'>Choose chain</label>
                    <div className='form-check'>
                      <input
                        className='form-check-input'
                        type='radio'
                        name='chainOptions'
                        id='polygon'
                        value='polygon'
                        checked={chain === 'polygon'}
                        onChange={(e) => setChain(e.target.value)}
                      />
                      <label className='form-check-label' htmlFor='polygon'>
                        Polygon
                      </label>
                    </div>
                    <div className='form-check'>
                      <input
                        className='form-check-input'
                        type='radio'
                        name='chainOptions'
                        id='base'
                        value='base'
                        checked={chain === 'base'}
                        onChange={(e) => setChain(e.target.value)}
                      />
                      <label className='form-check-label' htmlFor='base'>
                        Base
                      </label>
                    </div>
                    <div className='form-check'>
                      <input
                        className='form-check-input'
                        type='radio'
                        name='chainOptions'
                        id='arbitrum'
                        value='arbitrum'
                        checked={chain === 'arbitrum'}
                        onChange={(e) => setChain(e.target.value)}
                      />
                      <label className='form-check-label' htmlFor='arbitrum'>
                        Arbitrum
                      </label>
                    </div>
                  </div>
                  <button
                    type='submit'
                    onClick={() =>
                      toast.success('Collection deployed successfully!')
                    }
                    className='btn btn-main'
                  >
                    Deploy Collection
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {showModal ? <div className='modal-backdrop show'></div> : null} */}
    </>
  )
}

export default Collection
