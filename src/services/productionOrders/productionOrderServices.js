export const isCreatedState = ((productionOrder)=>{
    return productionOrder.startedDate === null && productionOrder.canceledDate === null && productionOrder.closedDate === null
})

export const isStartedState = ((productionOrder)=>{
    return productionOrder.startedDate !== null && productionOrder.canceledDate === null && productionOrder.closedDate === null
})

export const isCanceledState = ((productionOrder)=>{
    return productionOrder.startedDate !== null && productionOrder.canceledDate !== null && productionOrder.closedDate === null
})

export const isClosedState = ((productionOrder)=>{
    return productionOrder.startedDate === null && productionOrder.canceledDate !== null && productionOrder.closedDate === null
})

export const canUpdateOrDeleteProductionOrder = ((productionOrder)=>{
    return isCreatedState(productionOrder) || isCanceledState(productionOrder)
})

export const getButtonsState = ((productionOrder) => {
    const result = {
        startedButtonDisabled: true,
        canceledButtonDisabled: true,
        closedButtonDisabled: true
    }
    if (productionOrder === null) {
        return result
    }
    if (isCreatedState(productionOrder)) {
        result.startedButtonDisabled = false
        result.canceledButtonDisabled = true
        result.closedButtonDisabled = true

    } else if (isStartedState(productionOrder)) {
        result.startedButtonDisabled = true
        result.canceledButtonDisabled = false
        result.closedButtonDisabled = false
    } else if (isCanceledState(productionOrder)) {
        result.startedButtonDisabled = false
        result.canceledButtonDisabled = true
        result.closedButtonDisabled = true

    } else if (isClosedState(productionOrder)) {
        result.startedButtonDisabled = true
        result.canceledButtonDisabled = true
        result.closedButtonDisabled = true
    }

    return result
})