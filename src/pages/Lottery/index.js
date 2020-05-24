import React, { useState } from 'react'
import CurrencyInputPanel from '../../components/CurrencyInputPanel'
// import { useAddressBalance, useExchangeReserves } from '../../contexts/Balances'
// import { useWeb3React, useExchangeContract } from '../../hooks'
// import { amountFormatter, calculateGasMargin } from '../../utils'
import styled from 'styled-components'
import { Button } from '../../theme'
// import { ethers } from 'ethers'


export default function Lottery({ params }) {
  // const { library, account, active, chainId } = useWeb3React()
  const candiesOwned = 22
  const candyPrice = 0.2
  const drawPoolSize = 333
  const committedPoolSize = 420
  
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
  
  // function formatBalance(value) {
  //   return `Balance: ${value}`
  // }

  const [sponsorValue, setSponsorValue] = useState()

  const inputCurrency = '0xB5E5D0F8C0cbA267CD3D7035d6AdC8eBA7Df7Cdd'
  // const inputBalance = useAddressBalance(account, inputCurrency)

  function onSponsor() {

  }

  return (
    <div>
      <Row>
        <Col>
          <CurrencyInputPanel
            title="Candies Owned"
            value={candiesOwned}
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
