interface Props {
  className: string
}
function RotateLeftIcon({ className }: Props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='18'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
    >
      <path d='M1 4v6h6'></path>
      <path d='M3.51 15a9 9 0 1 0 2.13-9.36L1 10'></path>
    </svg>
  )
}

export default RotateLeftIcon
