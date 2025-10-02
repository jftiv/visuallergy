export const TimeRangeFilter = ({ 
  timeRange, 
  customDate, 
  onTimeRangeChange, 
  onCustomDateChange 
}) => {
  return (
    <div className="mb-6 flex flex-col gap-4 items-start">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full">
        <label htmlFor="timeRange" className="text-sm font-medium whitespace-nowrap">
          Show meals from:
        </label>
        <select
          id="timeRange"
          value={timeRange}
          onChange={onTimeRangeChange}
          className="px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring w-full sm:w-auto min-w-0"
        >
          <option value="1week">Last week</option>
          <option value="30days">Last 30 days</option>
          <option value="90days" selected>Last 90 days</option>
          <option value="6months">Last 6 months</option>
          <option value="1year">Last year</option>
          <option value="all">All time</option>
          <option value="custom">Custom date</option>
        </select>
      </div>
      
      {timeRange === 'custom' && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full">
          <label htmlFor="customDate" className="text-sm font-medium whitespace-nowrap">
            From:
          </label>
          <input
            type="date"
            id="customDate"
            value={customDate}
            onChange={onCustomDateChange}
            className="px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring w-full sm:w-auto min-w-0"
          />
        </div>
      )}
    </div>
  );
};
