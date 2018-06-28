package com.hywa.cors.mapper;

import com.hywa.cors.entity.Menu;
import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.hywa.cors.vo.MenuVo;

import java.util.List;

import org.apache.ibatis.annotations.Param;

/**
 * <p>
 * 菜单 Mapper 接口
 * </p>
 *
 * @author xbb
 * @since 2018-05-11
 */
public interface MenuDao extends BaseMapper<Menu> {

    List<MenuVo> getMenuByUserIdAndParentId(@Param("userId") String userId, @Param("parentId") String parentId);

    List<MenuVo> getMenuByParentId(@Param("parentId") String parentId);
    
    List<MenuVo> getFirstDegree();
    
    List<MenuVo> getByParentId(@Param("parentId")String parentId);
    
    List<MenuVo> getRoleMenuByParentId(@Param("roleId")String roleId, @Param("parentId")String parentId);    
}
