interface interfLoading {
    loading: boolean
}
export const Loading = (props: interfLoading) => {
    return (
        props.loading ? (
            <div
                style={{
                    position: 'fixed',
                    zIndex: 2,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgb(0,0,0,0.3)'
                }}
            >
                <div className="spinner-border"
                    style={{
                        width: 70,
                        height: 70,
                    }}></div>

            </div>
        )
        :
        <></>
    )
}