import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

/** @type {import('react').Context<any>} */
export const AppContext = createContext(null);

/**
 * @param {any} props
 */
const AppContextProvider = (props) => {

  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [credits, setCredits] = useState(0);
  const [loadingPlanId, setLoadingPlanId] = useState(null);

  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const navigate = useNavigate()

  // Helper to extract error message from axios or standard errors
  const getErrorMessage = (error) => {
    return error?.response?.data?.message || error?.message || 'Something went wrong'
  }

  const loadCreditsData = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + '/api/user/credit',
        { headers: { token } }
      )
      if (data.success) {
        setCredits(data.credits)
        setUser(data.user)
      }
    } catch (error) {
      console.error('loadCreditsData error:', error)
      toast.error(getErrorMessage(error))
    }
  }

  const generateImage = async (prompt) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/image/generate-image",
        { prompt },
        { headers: { token } }
      )
      if (data.success) {
        await loadCreditsData()
        return data.image
      } else {
        toast.error(data.message)
        await loadCreditsData()
        if (data.creditBalance === 0) {
          navigate("/buycredit")
        }
      }
    } catch (error) {
      console.error('generateImage error:', error)
      toast.error(getErrorMessage(error))
    }
  }

  const initPay = (order) => {
    if (!window.Razorpay) {
      toast.error('Razorpay SDK not loaded. Please refresh and try again.')
      setLoadingPlanId(null)
      return
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Imagify',
      description: 'Purchase credits for Imagify',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            backendUrl + '/api/user/verify-razorpay',
            response,
            { headers: { token } }
          )
          if (data.success) {
            await loadCreditsData()
            navigate('/')
            toast.success('Credits Added Successfully!')
          } else {
            toast.error(data.message)
          }
        } catch (error) {
          console.error('verifyRazorpay error:', error)
          toast.error(getErrorMessage(error))
        } finally {
          setLoadingPlanId(null)
        }
      },
      modal: {
        ondismiss: () => {
          toast.error('Payment cancelled')
          setLoadingPlanId(null)
        }
      },
      theme: {
        color: '#7c3aed'
      }
    }

    const rzp = new window.Razorpay(options)

    rzp.on('payment.failed', (response) => {
      console.error('Payment failed:', response.error)
      toast.error(response.error?.description || 'Payment failed')
      setLoadingPlanId(null)
    })

    rzp.open()
  }

  const payRazorpay = async (planId) => {
    try {
      if (!user) {
        setShowLogin(true)
        return
      }

      setLoadingPlanId(planId)

      const { data } = await axios.post(
        backendUrl + '/api/user/pay-razorpay',
        { planId },
        { headers: { token } }
      )

      if (data.success) {
        initPay(data.order)
      } else {
        toast.error(data.message)
        setLoadingPlanId(null)
      }
    } catch (error) {
      console.error('payRazorpay error:', error)
      toast.error(getErrorMessage(error))
      setLoadingPlanId(null)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken('')
    setUser(null)
    setCredits(0)
    navigate('/')
  }

  useEffect(() => {
    if (token) {
      loadCreditsData()
    }
  }, [token])

  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    backendUrl,
    token,
    setToken,
    credits,
    setCredits,
    loadCreditsData,
    logout,
    generateImage,
    payRazorpay,
    loadingPlanId,
  }

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider