const Loading = () => {
  return (
    <div className="loading-cube">
      <img src="/images/cube.gif" />
      <style jsx>{`
      .loading-cube {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 60px;
        height: 60px;
        margin: 30px auto;
        z-index: 1000000000000000;
        position: relative;
      }

      .loading-cube img { 
        max-width: 60px;
        max-height: 60px;
        }
      `}</style>
    </div>
  )
}
export default Loading;