// HotelComparisonCard.jsx
const hotels = [
  {
    name: '曼谷素坤逸龙马宾馆',
    priceRange: '￥8,000-10,000',
    platform: 'Agoda公司测试',
    area: '素坤逸',
    distance: 'BTS Asok',
    service: '无污渍房间、定期清扫',
    rating: '9.2/10（286条评论）',
    pros: '离BTS很近、闹市区，夜市丰富',
    cons: '房间小、靠近马路有点吵',
    url: '#', // 或者实际详情链接
  },
  {
    name: '曼谷诗纳卡琳开泰酒店',
    priceRange: '￥4,500-6,000',
    platform: '携程',
    area: '是隆地区',
    distance: 'BTS Chong Nonsi',
    service: '专业清洁、卫生标准高',
    rating: '8.8/10（620条评论）',
    pros: '价格实惠、交通方便',
    cons: '早饭一般、设施较老',
    url: '#',
  },
  {
    name: '曼谷芭东酒店',
    priceRange: '￥2,500-3,500',
    platform: 'Booking.com',
    area: 'Ratchathewi区',
    distance: 'BTS Ratchathewi',
    service: '每日打扫、更换床单',
    rating: '7.5/10（150条评论）',
    pros: '位置方便、性价比高',
    cons: '服务态度一般、隔音不佳',
    url: '#',
  },
];

const HotelComparisonCard = () => {
  return (
    <div className="mx-auto max-w-7xl pb-8 px-4 pt-2">
      <div className="text-2xl font-bold mb-6">酒店比较</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <div
            key={hotel.name}
            className="border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col"
          >
            <h3 className="text-xl font-semibold mb-2">{hotel.name}</h3>

            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium">价格区间:</span> {hotel.priceRange}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium">平台/品牌:</span> {hotel.platform}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium">区域:</span> {hotel.area}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium">交通距离:</span> {hotel.distance}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium">卫生服务:</span> {hotel.service}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium">客户评分:</span> {hotel.rating}
            </p>

            <div className="mt-2 mb-4 text-sm text-gray-700">
              <p>
                <span className="font-semibold text-green-700">优: </span>
                {hotel.pros}
              </p>
              <p>
                <span className="font-semibold text-red-600">缺: </span>
                {hotel.cons}
              </p>
            </div>

            <a
              href={hotel.url}
              className="not-porse mt-auto inline-block bg-blue-600 text-white px-4 py-2 rounded-md text-center hover:bg-blue-700 transition-colors"
            >
              查看详情
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelComparisonCard;
