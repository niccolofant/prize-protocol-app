import tw from 'twin.macro'

export const PlayerStatsCardWrapper = tw.div`
    space-y-2 rounded-xl bg-gradient-to-r from-prize-blue via-prize-red to-prize-red p-10 shadow-xl
`

export const PlayerCardHeaderWrapper = tw.div`
    flex justify-between items-center
`

export const PlayerCardTitle = tw.h1`
    text-2xl font-semibold text-white
`

export const PlayerCardLink = tw.p`
    flex cursor-pointer items-center font-medium text-base text-white underline
`

export const PlayerCardBodyWrapper = tw.div`
    grid grid-cols-1 md:grid-cols-2
`

export const PlayerCardText = tw.p`
    text-3xl font-medium text-white
`

export const PlayerCardButton = tw.button`
    rounded-lg bg-white py-2 px-10 font-semibold text-gray-700 shadow-xl
`
