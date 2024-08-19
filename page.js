'use client'

import { Box, Stack, Typography, Modal, TextField, Button } from '@mui/material'
import { firestore } from './firebase'
import { collection, query, getDocs, getDoc, deleteDoc, doc, setDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'

export default function Home() {
  const [pantry, setPantry] = useState([])
  const [open, setOpen] = useState(false)
  const [itemName, setItemName] = useState('')

  const updatePantry = async () => {
    const snapshot = query(collection(firestore, 'pantry'))
    const docs = await getDocs(snapshot)
    const pantryList = []
    docs.forEach((doc) => {
      pantryList.push({ name: doc.id, ...doc.data() })
    })
    setPantry(pantryList)
  }

  const addItem = async (item) => {
    const docRef = doc(firestore, 'pantry', item)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      await setDoc(docRef, { quantity: quantity + 1 })
    } else {
      await setDoc(docRef, { quantity: 1 })
    }
    await updatePantry()
  }

  const removeItem = async (item) => {
    const docRef = doc(firestore, 'pantry', item)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      if (quantity === 1) {
        await deleteDoc(docRef)
      } else {
        await setDoc(docRef, { quantity: quantity - 1 })
      }
    }
    await updatePantry()
  }

  useEffect(() => {
    updatePantry()
  }, [])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Box
      width="100vw"
      height="100vh"
      display={"flex"}
      flexDirection="column"
      justifyContent={"center"}
      alignItems={"center"}
      gap={2}
    >
      <Modal open={open} onClose={handleClose}>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          width={400}
          bgcolor="white"
          border="2px solid #333"
          boxShadow={24}
          p={4}
          display={"flex"}
          flexDirection={"column"}
          gap={3}
          sx={{
            transform: "translate(-50%, -50%)"
          }}
        >
          <Typography variant='h6'>Add Item</Typography>
          <Stack width="100%" direction="row" spacing={9}>
            <TextField
              variant='outlined'
              fullWidth
              value={itemName}
              onChange={(e) => {
                setItemName(e.target.value)
              }}
            ></TextField>
            <Button variant='outlined' onClick={() => {
              addItem(itemName)
              setItemName('')
              handleClose()
            }}>Add</Button>
          </Stack>
        </Box>
      </Modal>
      <Button variant='contained' onClick={() => { handleOpen() }}>Add New Item</Button>
      <Box border='1px solid #000'>
        <Box width="800px" height="100px" bgcolor="#add8e6" display="flex" alignItems="center" justifyContent="center">
          <Typography variant='h2' color="#333">Inventory</Typography>
        </Box>
        {pantry.map(({ name, quantity }) => (
          <Box
            key={name}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            padding={1}
          >
            <Typography minWidth="150px">{name.charAt(0).toUpperCase() + name.slice(1)}</Typography>
            <Typography>{quantity}</Typography>
            <Button onClick={() => removeItem(name)}>Remove</Button>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
