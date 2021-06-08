const Loading = () => {
  return (
    <div className="loading-cube">
      <img src="/images/cube.gif" />
      <style jsx>{`
      .loading-cube {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 50px;
        margin: 30px auto;
      }

      .loading-cube img { 
        max-width: 50px;
        max-height: 50px;
        }
      `}</style>
    </div>
  )
}
export default Loading;