import {
  useEffect,
  useState
} from 'react'

import { useRouter } from 'next/router'

import { NoDataFound } from '@/common/Loading'
import { Seo } from '@/common/Seo'
import { NewReportSkeleton } from '@/modules/reporting/new/NewReportSkeleton'
import { Routes } from '@/src/config/routes'
import { useCoversAndProducts } from '@/src/context/CoversAndProductsData'
import { isValidProduct } from '@/src/helpers/cover'
import {
  useFetchCoverProductActiveReportings
} from '@/src/hooks/useFetchCoverProductActiveReportings'
import {
  CoverReportingRules
} from '@/src/modules/reporting/CoverReportingRules'
import {
  NewIncidentReportForm
} from '@/src/modules/reporting/NewIncidentReportForm'
import { ReportingHero } from '@/src/modules/reporting/ReportingHero'

export function NewIncidentReportPage ({ coverKey, productKey }) {
  const [accepted, setAccepted] = useState(false)
  const router = useRouter()

  const isDiversified = isValidProduct(productKey)
  const { loading, getProduct, getCoverByCoverKey } = useCoversAndProducts()
  const coverOrProductData = isDiversified ? getProduct(coverKey, productKey) : getCoverByCoverKey(coverKey)

  const { data: activeReportings } = useFetchCoverProductActiveReportings({
    coverKey,
    productKey
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [accepted])

  // Redirect to active reporting if exists
  useEffect(() => {
    const hasActiveReportings = activeReportings && activeReportings.length > 0

    if (!hasActiveReportings) { return }

    router.replace(
      Routes.ViewReport(coverKey, productKey, activeReportings[0].incidentDate)
    )
  }, [activeReportings, coverKey, productKey, router])

  if (loading) {
    return (
      <NewReportSkeleton />
    )
  }

  if (!coverOrProductData) {
    return (
      <NoDataFound />
    )
  }

  const projectOrProductName = isDiversified
    ? coverOrProductData?.productInfoDetails?.productName
    : coverOrProductData?.coverInfoDetails.coverName || coverOrProductData?.coverInfoDetails.projectName

  const handleAcceptRules = () => {
    setAccepted(true)
  }

  return (
    <main>
      <Seo />

      {/* hero */}
      <ReportingHero
        coverKey={coverKey}
        productKey={productKey}
        coverOrProductData={coverOrProductData}
        projectOrProductName={projectOrProductName}
        type='new-report'
      />
      <hr className='border-B0C4DB' />

      {accepted
        ? (
          <NewIncidentReportForm
            coverKey={coverKey}
            productKey={productKey}
            minReportingStake={coverOrProductData?.minReportingStake}
          />
          )
        : (
          <CoverReportingRules
            coverOrProductData={coverOrProductData}
            handleAcceptRules={handleAcceptRules}
            activeReportings={activeReportings}
          />
          )}
    </main>
  )
}
