<?php defined('_VR360_EXEC') or die; ?>

<div class="panel panel-primary">
	<div class="panel-heading">
		<h3 class="panel-title"></h3>
	</div>
	<div class="panel-body">
		<form method="post">
		<input
				type="text"
				class="form-control"
				id="task-table-filter"
				data-action="filter"
				data-filters="#task-table"
				placeholder="Search tours"
				name="keyword"
		/>
			<input type="hidden" name="view" value="tours"/>
			<input type="hidden" name="task" value="display"/>
		</form>
	</div>
	<table id="vTours" class="table table-condensed table-bordered table-responsive table-hover">
		<thead>
		<tr>
			<th>#</th>
			<th><i class="fa fa-window-maximize" aria-hidden="true"></i> vTour name</th>
			<th><i class="fa fa-link" aria-hidden="true"></i> Friendly URL</th>
			<th><i class="fa fa-calendar" aria-hidden="true"></i> Creation day</th>
			<th><i class="fa fa-check-square-o" aria-hidden="true"></i> Status</th>
			<th><i class="fa fa-cogs" aria-hidden="true"></i> Controls</th>
		</tr>
		</thead>
		<tbody>
		<!-- Show tours -->
		<?php foreach ($this->tours as $tour): ?>
			<tr id='vtour-<?php echo $tour->id; ?>' data-tour='<?php echo $tour->toJson(); ?>' class="is-valid-<?php echo (int) $tour->isValid(); ?>">
				<td class="vtour-id"><?php echo $tour->id; ?></td>
				<td class="vtour-name"><?php echo $tour->getName(); ?></td>
				<td class="vtour-url"><?php echo $tour->alias; ?></td>
				<td class="vtour-date"><?php echo $tour->created; ?></td>
				<td class="status"><?php echo ($tour->status == 1) ? '<i class="fa fa-check" aria-hidden="true"></i>' : ''; ?></td>
				<td class="controls">
					<?php if (!$tour->canEmbed() && !$tour->canEdit() && !$tour->canEditHotspot() && !$tour->canPreview()): ?>
						<span class="label label-default">This tour is not generated success or invalid</span>
					<?php else: ?>
						<?php if ($tour->canEmbed()): ?>
							<!-- Embed -->
							<button type="button" class="btn btn-default embedCode">
								<i class="fa fa-code" aria-hidden="true"></i> Embed
							</button>
						<?php endif; ?>

						<?php if ($tour->canEdit()): ?>
							<!-- Edit -->
							<button type="button" class="btn btn-primary editTour">
								<i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit
							</button>
						<?php endif; ?>

						<?php if ($tour->canEditHotspot()): ?>
							<!-- Hotspot -->
							<button type="button" class="btn btn-primary editTourHotspot">
								<i class="fa fa-pencil-square-o" aria-hidden="true"></i> Hotspot
							</button>
						<?php endif; ?>

						<?php if ($tour->canPreview()): ?>
							<!-- Preview -->
							<button type="button" class="btn btn-info previewTour">
								<i class="fa fa-external-link" aria-hidden="true"></i> Preview
							</button>
						<?php endif; ?>
					<?php endif; ?>
					<button type="button" class="btn btn-danger removeTour">
						<i class="fa fa-eraser" aria-hidden="true"></i> Remove
					</button>
				</td>
			</tr>
		<?php endforeach; ?>
		</tbody>
	</table>

	<!-- Pagination -->
	<div class="col-md-12">
		<div class="row">
			<div class="container-fluid">
				<nav aria-label="...">
					<ul class="pagination">
						<?php for ($index = 1; $index <= $this->pagination['total']; $index++): ?>
							<li class="<?php echo $index == $this->pagination['current'] ? 'active' : ''; ?>">
								<a href="index.php?page=<?php echo $index; ?>"><?php echo $index; ?></a>
							</li>
						<?php endfor; ?>
					</ul>
				</nav>
			</div>
		</div>
	</div>
</div>
