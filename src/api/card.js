const card = {
	getListInfo: '/datacenter/param/v1/enterpriseCard/getListInfo', // 获取企业通用卡列表信息
	addCard: '/datacenter/body/v1/enterpriseCard/addCard', // 新增企业通用卡信息
	getCardInfo: '/datacenter/param/v1/enterpriseCard/getCardInfo', // 获取企业通用卡基本信息
	editCardAvailableList: '/datacenter/body/v1/enterpriseCard/editCardAvailableList', // 修改企业通用卡适用企业
	getCardAvailableList: '/datacenter/param/v1/enterpriseCard/getCardAvailableList', // 获取企业通用卡适用企业
	editCardInfo: '/datacenter/body/v1/enterpriseCard/editCardInfo', // 修改企业通用卡基本信息
	changeCardStatus: '/datacenter/body/v1/enterpriseCard/changeCardStatus', // 修改企业通用卡状态信息
	delCard: '/datacenter/body/v1/enterpriseCard/delCard', // 删除企业通用卡信息
	changeUserCardBalanceByMobile: '/datacenter/body/v1/enterpriseCard/changeUserCardBalanceByMobile', // 通过手机为会员变更企业通用积分
	getEnterpriseCard: '/datacenter/param/v1/enterpriseCard/getEnterpriseCard', // 获取企业内可用的企业通用卡
	getUserEnterpriseCard: '/datacenter/param/v1/enterpriseCard/getUserEnterpriseCard', // 获取企业内会员通用卡列表
	changeUserCardStatus: '/datacenter/body/v1/enterpriseCard/changeUserCardStatus', // 变更会员企业通用卡状态
	delUserCard: '/datacenter/body/v1/enterpriseCard/delUserCard', // 删除会员企业通用卡
	changeUserCardBalanceById: '/datacenter/body/v1/enterpriseCard/changeUserCardBalanceById', // 通过会员企业通用卡id为变更积分
	getAvailableAllianceList: '/datacenter/param/v1/enterpriseCard/getAvailableAllianceList', // 获取通用卡可用的联盟企业信息
	getUserEnterpriseCardInfo: '/datacenter/param/v1/enterpriseCard/getUserEnterpriseCardInfo', // 通过手机获取会员通用卡信息接口
	getAllCardBalanceLog: '/datacenter/param/v1/enterpriseCard/getAllCardBalanceLog', // 获取所有会员通用卡消费记录接口
	getUserCardBalanceLog: '/datacenter/param/v1/enterpriseCard/getUserCardBalanceLog', // 获取指定会员通用卡的消费记录接口
	getUserCardAlterLog: '/datacenter/param/v1/enterpriseCard/getUserCardAlterLog', // 2.21.	获取通用卡的变更日记接口
}

export default card