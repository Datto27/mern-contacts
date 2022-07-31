import React from 'react'

// კომპონენტი შექმნილია ამა თუ იმ ალერტის საჩვენებლად აუთენტიპიკაციისა და ცონტაქტის შენახვის დროს
const MyAlert = ({text, type}) => {
  return (
    <div className={`alert ${type}`}>
      <h3 className={`${type}-message`}>{text}</h3>
    </div>
  )
}

export default MyAlert