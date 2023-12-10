import { useState } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Collection() {
  const [showModal, setShowModal] = useState(false)
  const [imageUrl, setImageUrl] = useState(
    'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGljfGVufDB8fDB8fHww'
  )
  const [collectionName, setCollectionName] = useState('test')
  const [collectionDescription, setCollectionDescription] = useState('test')
  const [chain, setChain] = useState('polygon')

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

  return (
    <>
      <button className='btn btn-primary' onClick={toggleModal}>
        Create a collection
      </button>

      {showModal ? (
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

      {showModal ? <div className='modal-backdrop show'></div> : null}
    </>
  )
}

export default Collection
