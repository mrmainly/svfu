function createUnit(data) {
    console.log(data)
    return 1
}

function createUnitSoft(unitId, data) {
    console.log(unitId)
    console.log(data)
    return 1
}

function createUnitSoftChapter(unitSoftId, data) {
    console.log(unitSoftId)
    console.log(data)
    return 1
}


function revertUnit(unitId) {
    console.log(unitId)
}


function revertUnitSoft(unitSoftId) {
    revertUnit(unitSoftId)
}

function revertUnitSoftChapter(unitSoftChapterId) {
    revertUnitSoft(unitSoftChapterId)
}

function createFullUnit(data) {
    const unitId = createUnit(data)
    if (unitId) {
        const unitSoftId = createUnitSoft(unitId, data)
        if (unitSoftId) {
            const unitSoftChapterId = createUnitSoftChapter(unitSoftId, data)
            if (unitSoftChapterId) {
                revertUnitSoftChapter(unitSoftChapterId)
            } else {
                revertUnitSoft(unitId)
            }
        } else {
            revertUnit(unitId, data)
        }
    } else {
        console.log('Error') // TODO: output error to user
    }
}

export default createFullUnit