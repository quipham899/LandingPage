import React, { useState, useEffect } from 'react'
import CurrencyInputPanel from '../../components/CurrencyInputPanel'
// import { useAddressBalance, useExchangeReserves } from '../../contexts/Balances'
import { useWeb3React } from '../../hooks'
// import { amountFormatter, calculateGasMargin } from '../../utils'
import styled from 'styled-components'
import { Button } from '../../theme'
// import { ethers } from 'ethers'
import { amountFormatter, calculateGasMargin, isAddress, getContract } from '../../utils'
import * as constants from '../../constants'
import CANDYSTORE_ABI from '../../constants/abis/candyStore.json'
import CANDYARBER_ABI from '../../constants/abis/candyShopArber.json'
import { BigNumber } from '@uniswap/sdk'
import { ethers } from 'ethers'

const Row = styled.div`
  margin: 2rem 0 2rem 0;
  display: flex;
`

const Col = styled.div`
  width: 50%;
  margin: 0 1rem 0 1rem;
`

const Flex = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;

  button {
    max-width: 20rem;
  }
`
const TEN = new BigNumber(10)
const DECIMAL_FACTOR = TEN.pow(18)

let fetched = false
export default function Lottery({ params }) {
  const [candiesOwned, setCandiesOwned] = useState(22)
  const [candyPrice, setCandyPrice] = useState(0)
  const [drawPoolSize, setDrawPoolSize] = useState(333)
  const [committedPoolSize, setCommittedPoolSize] = useState(420)
  const [sponsorValue, setSponsorValue] = useState()
  const [openDraw, setOpenDraw] = useState(0)

  const inputCurrency = constants.ropstenDAI
  const { library, account, active, chainId } = useWeb3React()
  const candyStore = getContract(constants.CANDYSTORE_ADDRESS, CANDYSTORE_ABI, library)
  const candyArber = getContract(constants.CANDYARBER_ADDRESS, CANDYARBER_ABI, library)

  useEffect(() => {
    async function fetchOpenDraw() {
      const newOpenDraw = await candyStore.openDraw()
      if (newOpenDraw.toString(10) !== openDraw.toString(10)) {
        setOpenDraw(newOpenDraw)
      }
    }
    fetchOpenDraw()
  })

  useEffect(() => {
    async function fetchDetails() {
      const lottery = await candyStore.lottery(openDraw.toString(10))
      const price = new BigNumber(lottery.candyPrice.toString())
      setCandyPrice(price.div(DECIMAL_FACTOR))
      const drawPoolSize = lottery.candyPrice.mul(lottery.totalCandy)
      setDrawPoolSize(drawPoolSize)

      const committedLottery = await candyStore.lottery((openDraw-1).toString(10))
      const committedPoolSize = committedLottery.candyPrice.mul(committedLottery.totalCandy)
      setCommittedPoolSize(committedPoolSize)
    }
    fetchDetails()
  }, [openDraw])

  // const inputBalance = useAddressBalance(account, inputCurrency)

  // function formatBalance(value) {
  //   return `Balance: ${value}`
  // }

  function onSponsor() {

  }



  return (
    <div>
      <Row>
        <Col>
          <CurrencyInputPanel
            title="Candies Owned"
            value={openDraw}
            disabled
            hideTokenSelect
          />
        </Col>
        <Col>
          <CurrencyInputPanel
            title="Candy Price"
            value={candyPrice}
            disabled
            selectedTokenAddress={inputCurrency}
            disableTokenSelect
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <CurrencyInputPanel
            title="Current Pool Size"
            value={drawPoolSize}
            disabled
            selectedTokenAddress={inputCurrency}
            disableTokenSelect
          />
        </Col>
        <Col>
          <CurrencyInputPanel
            title="Pool Size Committed for Interest"
            value={committedPoolSize}
            disabled
            selectedTokenAddress={inputCurrency}
            disableTokenSelect
          />
        </Col>
      </Row>
      <Row>
        <CurrencyInputPanel
          title="Sponsor Current Pool"
          value={sponsorValue}
          selectedTokenAddress={inputCurrency}
          disableTokenSelect
        />
      </Row>
        <Flex>
          <Button onClick={onSponsor}>
            {'Sponsor'}
          </Button>
        </Flex>
    </div>
  )
}
