import tw from 'twin.macro'

export const PlayerStatsCardWrapper = tw.div`
    space-y-2 rounded-xl bg-gradient-to-r from-prize-blue to-prize-red p-5 md:p-10 shadow-xl
`

export const PlayerCardHeaderWrapper = tw.div`
    flex justify-between items-center
`

export const PlayerCardTitle = tw.h1`
    text-2xl font-semibold text-white
`

export const PlayerCardLink = tw.p`
    flex cursor-pointer items-center font-medium text-xs sm:text-base text-white underline
`

export const PlayerCardBodyWrapper = tw.div`
    grid grid-cols-1 sm:grid-cols-2 space-y-2
`

export const PlayerCardText = tw.p`
    text-xl sm:text-3xl font-medium text-white
`

export const PlayerCardButton = tw.button`
    rounded-lg bg-white py-2 px-10 font-semibold text-prize-dark-gray shadow-xl text-sm sm:text-base
`
