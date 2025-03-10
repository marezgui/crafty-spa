export const TimelineDivider = ({ text }: { text: string }) => (
  <div className="bg-white dark:bg-gray-800">
    <div className="container mx-auto py-4 md:py-8">
      <div className="flex items-center">
        <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600"></div>
        <span className="px-4 text-lg font-medium whitespace-nowrap">
          {text}
        </span>
        <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600"></div>
      </div>
    </div>
  </div>
);