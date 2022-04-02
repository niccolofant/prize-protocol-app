import tw from 'twin.macro'

export const PrizeStatsCardWrapper = tw.div`
    rounded-xl border bg-white p-5 sm:p-10 shadow-xl dark:bg-gray-800 dark:border-prize-dark-gray
`

export const PrizeStatsTitle = tw.h1`
    text-2xl font-semibold text-prize-dark-gray dark:text-white
`

export const PrizeStatsText = tw.p`
    text-base text-prize-light-gray text-center
`

export const PrizeStatsHighlightText = tw.p`
    text-2xl font-medium text-prize-dark-gray text-center dark:text-white
`

export const PrizeStatsContentWrapper = tw.div`
    flex items-center justify-evenly
`
