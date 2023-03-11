import React from 'react'
import { Helmet, HelmetProvider } from "react-helmet-async"

const MetaComponents = ({title = "Online Shopping site in India: Shop Online for Mobiles, Books, Watches, Shoes and More - Amazon.in", description}) => {
  return (
    <HelmetProvider>
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description} />
        </Helmet>
    </HelmetProvider>
  )
}

export default MetaComponents