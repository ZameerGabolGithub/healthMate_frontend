 
const StatsCard = ({ title, value, icon: Icon, color = 'from-emerald-400 to-emerald-600 text-white' }) => {
  return (
    <div className="p-5 rounded-2xl glass card-strong">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-3xl font-extrabold mt-1 text-gray-900">{value}</h3>
        </div>
        {Icon && (
          <div className={`p-3 rounded-lg bg-gradient-to-br ${color} shadow-md`}> 
            <Icon className="text-2xl opacity-95" />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
