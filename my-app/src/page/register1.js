<List.Item
				key={key}
				style={style}
				prefix={
				 item.category
				}
			  >
				<Tag className='tag' round color='#2db7f5'>
						  {item.subCategory}
				</Tag>
				<Tag className='tag' round color='#2db7f5'>
						  {item.value}
				</Tag>
				<Tag className='tag' round color='#2db7f5'>
						  {item.date}
				</Tag>
				<Tag className='tag' round color={getPayColor(item.pay)}>
						  {getPayName(item.pay)}
				</Tag>
				<Tag className='tag' round color='#2db7f5'>
						  {item.description==''?'无描述':item.description}
				</Tag>

			</List.Item>
