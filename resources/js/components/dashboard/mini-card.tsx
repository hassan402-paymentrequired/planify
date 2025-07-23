const MiniCard = ({name,  count}: {name:string ,count: number}) => {
    return (
        <div className="data-[active=true]:bg-muted/50 relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6">
            <span className="text-muted-foreground capitalize text-xs">{name}</span>
            <span className="text-lg leading-none font-bold sm:text-3xl">{count}</span>
        </div>
    );
};

export default MiniCard;
